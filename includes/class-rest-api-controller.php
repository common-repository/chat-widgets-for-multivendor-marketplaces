<?php

defined('ABSPATH') || exit;

if (!class_exists('CWMM_Rest_Api_Controller')) {
	class CWMM_Rest_Api_Controller extends WP_REST_Controller
	{
		/** @var null */
		private static $instance = null;

		/**
		 * CWMM_Rest_Api_Controller constructor.
		 */
		public function __construct()
		{
			$this->namespace = 'cwmm/v1';
		}

		/**
		 * Register REST API routes
		 *
		 * @since 1.0.0
		 */
		public function register_routes()
		{

			//get all widgets
			register_rest_route($this->namespace, '/item/all/(?P<is_admin>\d)', array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => array($this, 'get_all_item'),
					'permission_callback' => 'is_user_logged_in',
				),
			));

			//update widget data
			register_rest_route($this->namespace, '/item-data/', array(
				array(
					'methods'             => WP_REST_Server::EDITABLE,
					'callback'            => array($this, 'set_item'),
					'permission_callback' => 'is_user_logged_in',
				),
			));

			//delete widget data
			register_rest_route($this->namespace, '/item-data/(?P<id>\d+)', array(
				array(
					'methods'             => WP_REST_Server::DELETABLE,
					'callback'            => array($this, 'delete_item'),
					'permission_callback' => 'is_user_logged_in',
				),
			));

			//get settings
			register_rest_route($this->namespace, '/settings/', array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => array($this, 'get_settings'),
					'permission_callback' => '__return_true',
				),
			));

			//update settings
			register_rest_route($this->namespace, '/settings/', array(
				array(
					'methods'             => WP_REST_Server::EDITABLE,
					'callback'            => array($this, 'update_settings'),
					'permission_callback' => 'is_user_logged_in',
				),
			));

			//update settings
			register_rest_route($this->namespace, '/set-all/', array(
				array(
					'methods'             => WP_REST_Server::EDITABLE,
					'callback'            => array($this, 'set_all'),
					'permission_callback' => 'is_user_logged_in',
				),
			));
		}

		public function set_all()
		{
			global $wpdb;
			$table = $wpdb->prefix . 'cwmm_chat_widgets';

			$query = $wpdb->prepare("UPDATE {$table} SET status = %s WHERE vendor_id > %d;", 'off', 0);
			$status = $wpdb->query($query);

			wp_send_json_success([
				'message'       => esc_html__('successfully disabled widgets of vendors', 'cwmm'),
				'affected_rows' => $status
			]);
		}

		public function get_settings()
		{
			$settings = (array) get_option('cwmm_settings', []);

			wp_send_json_success($settings);
		}

		public function update_settings($request)
		{
			$posted = json_decode($request->get_body());

			$data = [
				'enable'        => !empty($posted->enable) ? sanitize_key($posted->enable) : '',
				'vendor_enable' => !empty($posted->vendor_enable) ? sanitize_key($posted->vendor_enable) : '',
				'admin_default_enable' => !empty($posted->admin_default_enable) ? sanitize_key($posted->admin_default_enable) : '',
				'vendor_customization_enable' => !empty($posted->vendor_customization_enable) ? sanitize_key($posted->vendor_customization_enable) : '',
				'vendor_triggers_enable' => !empty($posted->vendor_triggers_enable) ? sanitize_key($posted->vendor_triggers_enable) : '',
				'disable_multivendor_widgets' => !empty($posted->disable_multivendor_widgets) ? sanitize_key($posted->disable_multivendor_widgets) : '',
			];

			update_option('cwmm_settings', $data);

			wp_send_json_success();
		}

		/**
		 * Update player data
		 *
		 * @param $request
		 */
		public function set_item($request)
		{
			$posted = json_decode($request->get_body());

			$id        = !empty($posted->id) && -1 != $posted->id ? intval($posted->id) : '';
			$is_admin  = !empty($posted->isAdmin);
			$vendor_id = $is_admin ? 0 : get_current_user_id();

			$data = [
				'vendor_id' => $vendor_id,
				'title'     => !empty($posted->title) ? sanitize_text_field($posted->title) : '',
				'status'    => !empty($posted->status) ? sanitize_key($posted->status) : 'on',
				'widgets'   => !empty($posted->widgets) ? serialize($posted->widgets) : [],
				'config'    => !empty($posted->config) ? serialize($posted->config) : [],
			];

			global $wpdb;
			$table = $wpdb->prefix . 'cwmm_chat_widgets';


			// check if the pro version is active.
			//$is_pro = apply_filters('cwmm/is_pro', false);

			if (true) {
				if ($id) {
					if ('on' === sanitize_text_field($posted->status)) {
						$wpdb->query($wpdb->prepare("UPDATE {$table} SET `status` = 'off' WHERE id != %d AND vendor_id = $vendor_id ", absint($id)));
						$wpdb->update($table, $data, ['id' => $id]);
					} else {
						$wpdb->update($table, $data, ['id' => $id]);
					}
				} else {
					$wpdb->insert($table, $data);
					$id = $wpdb->insert_id;
				}
			} else {
				if ($id) {
					$wpdb->update($table, $data, ['id' => $id]);
				} else {
					$wpdb->insert($table, $data);
					$id = $wpdb->insert_id;
				}
			}

			wp_send_json_success($id);
		}

		public function delete_item($data)
		{
			$id = isset($data['id']) ? $data['id'] : '';

			global $wpdb;
			$table = $wpdb->prefix . 'cwmm_chat_widgets';

			$wpdb->delete($table, ['id' => $id], ['%d']);

			wp_send_json_success();
		}

		/**
		 * Get all players callback
		 *
		 * @since 1.0.0
		 */
		public function get_all_item($request)
		{
			$is_admin = !empty($request['is_admin']);

			if (!$is_admin && !cwmm_can_vendor()) {
				wp_send_json_error(array('message' => __('You do not have access to this resource .', 'cwmm')), 401);
			}

			wp_send_json_success([
				'items' => cwmm_get_items([
					'vendor_id' => $is_admin ? 0 : get_current_user_id(),
				])
			]);
		}

		/**
		 * @return CWMM_Rest_Api_Controller|null
		 */
		public static function instance()
		{
			if (is_null(self::$instance)) {
				self::$instance = new self();
			}

			return self::$instance;
		}
	}
}
