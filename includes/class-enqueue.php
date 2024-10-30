<?php

defined('ABSPATH') || exit();

if (!class_exists('CWMM_Enqueue')) {
	class CWMM_Enqueue
	{

		/**
		 * @var null
		 */
		private static $instance = null;

		/**
		 * CWMM_Enqueue constructor.
		 */
		public function __construct()
		{
			add_action('wp_enqueue_scripts', [$this, 'frontend_scripts'], 9999);
			add_action('admin_enqueue_scripts', [$this, 'admin_enqueue']);
		}

		/**
		 * Frontend Scripts
		 *
		 * @param $hook
		 *
		 * @return void
		 * @since 1.0.0
		 */
		public function frontend_scripts($hook)
		{


			/* enqueue frontend styles */

			wp_enqueue_style('toastr', CWMM_ASSETS . '/css/toastr.min.css', null, CWMM_VERSION);

			wp_enqueue_style('cwmm', CWMM_ASSETS . '/css/frontend.css', array(
				'dashicons',
				'wp-components'
			), CWMM_VERSION);

			if (cwmm_is_dashboard_page()) {
				wp_enqueue_style('cwmm-tailwind', CWMM_ASSETS . '/css/tailwind.css');
			}


			wp_enqueue_media();

			/* enqueue frontend script */
			wp_enqueue_script('toastr', CWMM_ASSETS . '/js/toastr.min.js', null, CWMM_VERSION, true);

			wp_enqueue_script('cwmm', CWMM_ASSETS . '/js/frontend.min.js', array(
				'wp-element',
				'wp-i18n',
				'wp-block-editor',
				'wp-api-fetch',
				'wp-components',
			), CWMM_VERSION, true);

			/* localized script attached to 'cwmm' */
			wp_localize_script('cwmm', 'cwmm', array(
				'isAdmin'   => is_admin(),
				'settings'  => get_option('cwmm_settings'),
				'nonce'     => wp_create_nonce('wp_rest'),
				'pluginURL' => CWMM_URL,
				'icon_path' => CWMM_ASSETS . '/images/icon.svg',
				'isPRO'     => apply_filters('cwmm/is_pro', false),
				'isVendorCustomizer'	=> 'on' == cwmm_get_settings('vendor_customization_enable', 'on'),
				'isVendorTriggers'	=> 'on' == cwmm_get_settings('vendor_triggers_enable', 'on')
			));
		}

		/**
		 * Admin Scripts
		 *
		 * @param $hook
		 *
		 * @return void
		 * @since 1.0.0
		 */
		public function admin_enqueue($hook)
		{
			$licence_deactive  = apply_filters('cwmm/is_pro', false);
			$pro_activate = CWMM_Admin::cwmmpro_activation_status();
			$screen = get_current_screen();

			if (($pro_activate  && !$licence_deactive) || 'chat-widgets_page_cwmm-settings' == $screen->id) {
				remove_all_actions('admin_notices');
				remove_all_actions('all_admin_notices');
			}


			$wpplugin = new \WPPOOL\Product('chat_widgets_for_multivendor_marketplaces');
			$promodata = $wpplugin->offer();

			$time = !empty($promodata['counter_time']) ? strtotime($promodata['counter_time']) : strtotime('+ 14 hours');

			if ($time < time()) {
				$time = strtotime('+ 14 hours');
			}

			$promodata['counter_time'] = date('c', $time);

			//admin styles
			wp_enqueue_style('toastr', CWMM_ASSETS . '/css/toastr.min.css', null, CWMM_VERSION);

			wp_enqueue_style('cwmm', CWMM_ASSETS . '/css/admin.css', ['wp-components'], CWMM_VERSION);


			if (in_array($hook, ['toplevel_page_cwmm-chat-widgets', 'chat-widgets_page_cwmm-documentation', 'chat-widgets_page_cwmm-settings'])) {
				wp_enqueue_style('cwmm-tailwind', CWMM_ASSETS . '/css/tailwind.css');
			}

			wp_enqueue_media();

			wp_enqueue_script('toastr', CWMM_ASSETS . '/js/toastr.min.js', null, CWMM_VERSION, true);

			wp_enqueue_script('cwmm', CWMM_ASSETS . '/js/admin.min.js', array(
				'wp-element',
				'wp-i18n',
				'wp-block-editor',
				'wp-api-fetch',
				'wp-components',
			), CWMM_VERSION, true);

			wp_localize_script('cwmm', 'cwmm', array(
				'isAdmin'            => is_admin(),
				'adminUrl'   		 => get_admin_url(),
				'pro_active'   		 => CWMM_Admin::cwmmpro_activation_status(),
				'pluginURL'          => CWMM_URL,
				'admin_url'          => admin_url(),
				'isPRO'              => apply_filters('cwmm/is_pro', false),
				'multivendor_active' => CWMM_Admin::multivendor_activation_status(),
				'settings'			 => get_option('cwmm_settings'),
				'nonce'              => wp_create_nonce('cwmm'),
				'pages'              => wp_list_pluck(get_pages(), 'post_title', 'ID'),
				'i18n'               => array(),
				'promodata'	         => json_encode($promodata)
			));
		}

		/**
		 * @return CWMM_Enqueue|null
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

CWMM_Enqueue::instance();
