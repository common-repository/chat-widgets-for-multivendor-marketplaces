<?php

defined('ABSPATH') || exit();


/**
 * Get template files
 *
 * since 1.0.0
 *
 * @param        $template_name
 * @param array $args
 * @param string $template_path
 * @param string $default_path
 *
 * @return void
 */
function cwmm_get_template($template_name, $args = array(), $template_path = 'cwmm', $default_path = '')
{

	/* Add php file extension to the template name */
	$template_name = $template_name . '.php';

	/* Extract the args to variables */
	if ($args && is_array($args)) {
		extract($args);
	}

	/* Look within passed path within the theme - this is high priority. */
	$template = locate_template(array(trailingslashit($template_path) . $template_name));

	/* Get default template. */
	if (!$template) {
		$default_path = $default_path ? $default_path : CWMM_TEMPLATES;
		if (file_exists(trailingslashit($default_path) . $template_name)) {
			$template = trailingslashit($default_path) . $template_name;
		}
	}

	// Return what we found.
	include(apply_filters('cwmm/locate_template', $template, $template_name, $template_path));
}

function cwmm_get_items($args = [])
{

	$args = array_merge([
		'limit'  => 99,
		'status' => '%',
	], $args);

	global $wpdb;
	$table = $wpdb->prefix . 'cwmm_chat_widgets';

	$results = $wpdb->get_results($wpdb->prepare(
		"SELECT * FROM {$table} WHERE vendor_id = %d AND status LIKE %s ORDER BY id ASC LIMIT %d  ",
		[
			$args['vendor_id'],
			$args['status'],
			$args['limit'],
		]
	));

	$items = [];

	foreach ($results as $item) {
		$item->widgets = !empty($item->widgets) ? unserialize($item->widgets) : [];

		$item->config = unserialize($item->config);
		$items[]      = $item;
	}

	return $items;
}

function cwmm_render_widget($user_id = 0, $widget_possition = null)
{

	render_common($user_id, $widget_possition);
}


function render_common($user_id, $widget_possition)
{

	$config = [];

	$items = cwmm_get_items(['status' => 'on', 'vendor_id' => $user_id]);

	if (empty($items) && cwmm_get_settings('admin_default_enable') !== 'off') {
		$items = cwmm_get_items(['status' => 'on', 'vendor_id' => 0]);
	}

	if (!empty($items)) {

		foreach ($items as $item) {
			$item->config = (object) array_merge((array) $item->config, (array) $config);

			//check page exclude condition
			if ($user_id == 0 && !cwmm_check_exclude_pages($item->config)) {
				continue;
			}

			//check single product page render condition

			// if (!class_exists('WCFMmp')) {
			// 	if ('on' != $item->config->productPage) {
			// 		continue;
			// 	}
			// }


			//check date scheduling condition
			$dateScheduling = $item->config->dateScheduling;

			if (!empty($dateScheduling)) {
				if (!cwmm_check_date_rule($item->id, $dateScheduling)) {
					continue;
				}
			}

			if (!empty($item->config->daysHours)) {
				if (!cwmm_check_day_hours($item)) {
					continue;
				}
			}


			if ('vendor_info_widget' === $widget_possition) {
				if ('on' === $item->config->productPage && $item->vendor_id != 0) {
					printf('<div id="cwmm-vendor-widget-container" data-item=\'%s\'></div>', json_encode($item));
				}
			} else {
				printf('<div id="cwmm-widget-container" data-item=\'%s\'></div>', json_encode($item));
			}


			break;
		}
	}
}


function cwmm_can_vendor()
{
	$capability = '';

	if (function_exists('dokan')) {
		$capability = 'dokandar';
	}

	if (class_exists('WCFMmp')) {
		$capability = 'wcfm_vendor';
	}

	if (class_exists('MVX')) {
		$capability = 'dc_vendor';
	}

	return current_user_can($capability);
}

function cwmm_check_date_rule($id, $dateScheduling)
{


	try {
		$tz = new DateTimezone($dateScheduling->timeZone);
	} catch (Exception $e) {
		$tz = new DateTimezone('0');
	}

	$from      = new DateTime($dateScheduling->from, $tz);
	$from_time = strtotime($from->format('Y-m-d H:i:s'));

	$to      = new DateTime($dateScheduling->to, $tz);
	$to_time = strtotime($to->format('Y-m-d H:i:s'));

	$now      = new DateTime('now', $tz);
	$now_time = strtotime($now->format('Y-m-d H:i:s'));


	if ($to_time < $now_time) {
		global $wpdb;
		$table = $wpdb->prefix . 'cwmm_chat_widgets';

		$wpdb->update($table, ['status' => 'off',], ['id' => $id,]);

		return false;
	}

	return $from_time <= $now_time && $to_time >= $now_time;
}

function cwmm_check_day_hours($item)
{
	$return = false;

	try {
		$tz = new DateTimezone($item->config->daysHoursTimezone);
	} catch (Exception $e) {
		$tz = new DateTimezone('0');
	}

	$days_hours = $item->config->daysHours;

	foreach ($days_hours as $day_hour) {
		$c = new DateTime('now', $tz);

		$c_day  = $c->format('w');
		$c_time = strtotime($c->format('H:i:s'));

		$day = $day_hour->day;

		if (!in_array($day, ['all', 'st', 'mf']) && $day != $c_day) {
			continue;
		}

		if ('st' == $day && !($day > 0 && $day < 4)) {
			continue;
		}
		if ('mf' == $day && !($day > 1 && $day < 5)) {
			continue;
		}

		$from_date = new DateTime($day_hour->from, $tz);
		$to_date   = new DateTime($day_hour->to, $tz);

		$from_time = strtotime($from_date->format('H:i:s'));
		$to_time   = strtotime($to_date->format('H:i:s'));

		if ($from_time < $c_time && $to_time > $c_time) {
			$return = true;
			break;
		}
	}

	return $return;
}

function cwmm_get_settings($key, $default = '')
{
	$settings = (array) get_option('cwmm_settings');

	return !empty($settings[$key]) ? $settings[$key] : $default;
}

function cwmm_check_exclude_pages($config)
{
	if (is_page() || is_home()) {
		global $post;
		$post_id = $post->ID;

		$excludePages       = !empty($config->excludePages) ? $config->excludePages : [];
		$excludePagesExcept = !empty($config->excludePagesExcept) ? $config->excludePagesExcept : [];
		$excludeAllPages    = $config->excludeAllPages;

		if ('on' == $excludeAllPages) {
			if (!in_array($post_id, $excludePagesExcept)) {
				return false;
			}
		} else {
			if (in_array($post_id, $excludePages)) {
				return false;
			}
		}
	}

	return true;
}

function cwmm_is_dashboard_page()
{

	if (function_exists('dokan')) {
		return dokan_is_seller_dashboard();
	}

	if (class_exists('WCFMmp')) {
		return is_wcfm_page();
	}

	if (class_exists('MVX')) {
		return true;
	}

	return false;
}
