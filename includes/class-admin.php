<?php

defined('ABSPATH') || exit();

if (!class_exists('CWMM_Admin')) {
	class CWMM_Admin
	{
		/** @var null */
		private static $instance = null;

		/**
		 * CWMM_Admin constructor.
		 */
		public function __construct()
		{
			add_action('admin_menu', array($this, 'admin_menu'));

			add_action('init', array($this, 'flush_rewrite_rules'), 99);

			add_action('admin_head', array($this, 'admin_css'));

			add_action('admin_init', [$this, 'redirectOnActivation']);
		}


		public function redirectOnActivation()
		{
			$redirect_to_cwmm_page = get_option('redirect_to_cwmm_page', 0);

			if ($redirect_to_cwmm_page == 1) {
				update_option('redirect_to_cwmm_page', absint(0));
				wp_safe_redirect(admin_url('admin.php?page=cwmm-chat-widgets'));
				exit;
			}
		}

		public function admin_menu()
		{

			add_menu_page(__('Chat Widgets', 'cwmm'), __('Chat Widgets', 'cwmm'), 'manage_options', 'cwmm-chat-widgets', [
				$this,
				'render_chat_widget_admin_page'
			], CWMM_ASSETS . '/images/icon.svg', 80);

			add_submenu_page(
				'cwmm-chat-widgets',
				__('Dashboard', 'cwmm'),
				__('Dashboard', 'cwmm'),
				'manage_options',
				'cwmm-chat-widgets',
				[$this, 'render_chat_widget_admin_page']
			);


			add_submenu_page(
				'cwmm-chat-widgets',
				__('Settings - Chat widgets', 'cwmm'),
				__('Settings', 'cwmm'),
				'manage_options',
				'cwmm-settings',
				[$this, 'render_settings_page'],
				10
			);


			add_submenu_page('cwmm-chat-widgets', __('Get started - Chat widgets', 'cwmm'), __('Documentation', 'cwmm'), 'manage_options', 'cwmm-documentation', [
				$this,
				'render_get_started_page'
			], 10);



			if (isset($_GET['hide_cwmm_recommended_plugin']) && isset($_GET['nonce'])) {
				if (current_user_can('manage_options')) {
					$nonce = $_GET['nonce'];
					if (wp_verify_nonce($nonce, 'cwmm_recommended_plugin')) {
						update_option('hide_cwmm_recommended_plugin', true);
					}
				}
			}


			if (!get_option('hide_cwmm_recommended_plugin')) {
				add_submenu_page(
					'cwmm-chat-widgets',
					'Recommended Plugins',
					'Recommended Plugins',
					'manage_options',
					'cwmm-recommended-plugins',
					[$this, 'recommended_plugins_page'],
					10
				);
			}

			if (!apply_filters('cwmm/is_pro', false)) {
				add_submenu_page('cwmm-chat-widgets', __('Get PRO - Chat widgets for multivendor marketplaces', 'cwmm'), "<span id='cwmm-get-pro-menu'> <img src='" . CWMM_ASSETS . '/images/pro-icon.svg' . "' alt=''>
				GET <span>PRO</span> </span>", 'manage_options', '#');
			}
		}

		public function render_chat_widget_admin_page()
		{
			include_once CWMM_INCLUDES . '/views/admin-page.php';
		}

		public function render_get_started_page()
		{
			include_once CWMM_INCLUDES . '/views/get-started-page.php';
		}

		public function render_settings_page()
		{
			include_once CWMM_INCLUDES . '/views/settings-page.php';
		}

		public static function recommended_plugins_page()
		{
			include_once CWMM_INCLUDES . '/views/recommended-plugins.php';
		}


		public function flush_rewrite_rules()
		{
			if (get_option('cwmm_flush_rewrite_rules')) {
				flush_rewrite_rules();
				delete_option('cwmm_flush_rewrite_rules');
			}
		}

		public function admin_css()
		{ ?>
			<style>
				.toplevel_page_cwmm-chat-widgets .wp-menu-image img {
					width: 20px;
				}
			</style>
<?php }

		/**
		 * @return CWMM_Admin|null
		 */
		public static function instance()
		{
			if (is_null(self::$instance)) {
				self::$instance = new self();
			}

			return self::$instance;
		}

		public static function multivendor_activation_status()
		{
			$activation_status = false;

			$multivendor_plugins = array(
				"dokan-lite"     => "dokan-lite/dokan.php",
				"dc-multivendor" => "dc-woocommerce-multi-vendor/dc_product_vendor.php",
				"wc-multivendor" => "wc-multivendor-marketplace/wc-multivendor-marketplace.php",
			);

			foreach ($multivendor_plugins as $multivendor_plugin) {
				if (is_plugin_active($multivendor_plugin)) {
					$activation_status = true;
				}
			}

			return $activation_status;
		}


		public static function cwmmpro_activation_status()
		{
			$cwmm_pro = false;

			if (is_plugin_active('Chat-Widgets-for-Multivendor-Marketplaces-Pro/plugin.php')) {
				$cwmm_pro = true;
			}

			return $cwmm_pro;
		}
	}
}

CWMM_Admin::instance();
