<?php

defined('ABSPATH') || exit;


if (!class_exists('CWMM_Hooks')) {
	class CWMM_Hooks
	{
		/** @var null */
		private static $instance = null;
		public $cwmm_pro_activate = '';
		public $settings = [];


		/**
		 * CWMM_Hooks constructor.
		 */
		public function __construct()
		{
			$lience_activate  = get_option('cwmm_licence_activate');
			$this->settings = get_option('cwmm_settings');

			if (is_plugin_active('Chat-Widgets-for-Multivendor-Marketplaces-Pro/plugin.php')) {
				$this->cwmm_pro_activate = true;
			}

			//do nothing if not enabled
			if ('on' != cwmm_get_settings('enable', 'on')) {
				return;
			}

			if ('on' == cwmm_get_settings('vendor_enable', 'on')) {

				//dokan
				add_action('init', array($this, 'add_endpoint'));
				add_action('dokan_load_custom_template', [$this, 'load_chat_widget_template']);
				add_filter('dokan_get_dashboard_nav', [$this, 'add_chat_widgets_menu_dokan']);
				add_action('chat_widgets_content', [$this, 'render_chat_widget_content'], 10);

				add_action('woocommerce_single_product_summary', [$this, 'render_dokan_widget'], 10);

				add_action('dokan_product_seller_tab_end', [$this, 'render_dokan_vendor_info_widget'], 20);

				//wcfm
				add_filter('wcfm_menus', [$this, 'add_chat_widgets_menu_wcfm']);
				add_filter('wcfm_query_vars', [$this, 'add_wcfm_query_vars']);
				add_action('wcfm_load_views', [$this, 'load_wcfm_vendor_page']);

				add_action('after_wcfmmp_sold_by_label_single_product', [$this, 'render_wcfm_vendor_info_widget']);

				//wcmp
				add_filter('mvx_vendor_dashboard_nav', [$this, 'add_wcmp_vendor_menu']);
				add_filter('mvx_endpoints_query_vars', [$this, 'add_wcmp_query_vars']);
				add_action('mvx_vendor_dashboard_chat-widgets_endpoint', [$this, 'add_wcmp_menu_page']);

				add_filter('the_content', [$this, 'render_wcmp_widget']);

				add_action('mvx_after_vendor_tab', [$this, 'render_wcmp_vendor_info_widget']);
			}

			add_action('wp_footer', [$this, 'render_widget']);
		}

		//wcmp
		public function add_wcmp_vendor_menu($menus)
		{

			$menus['chat-widgets'] = array(
				'label'       => esc_html('Chat Widgets'),
				'url'         => mvx_get_vendor_dashboard_endpoint_url(get_mvx_vendor_settings('mvx_vendor_tools_endpoint', 'seller_dashbaord', 'chat-widgets')),
				'capability'  => apply_filters('mvx_vendor_dashboard_menu_vendor_tools_capability', true),
				'position'    => 80,
				'submenu'     => array(),
				'link_target' => '_self',
				'nav_icon'    => 'cwmm-wcmp-icon',

			);

			return $menus;
		}

		public function add_wcmp_query_vars($query_vars)
		{
			$query_vars['chat-widgets'] = [
				'label'    => 'Chat Wodgets',
				'endpoint' => get_mvx_vendor_settings('mvx_vendor_tools_endpoint', 'seller_dashbaord', 'chat-widgets')
			];

			return $query_vars;
		}

		public function add_wcmp_menu_page()
		{
?>
			<div class="col-md-12">
				<div id="cwmm_app"></div>
			</div>
			<?php

		}

		//wcfm
		public function add_wcfm_query_vars($query_vars)
		{
			$query_vars['chat-widgets'] = 'chat-widgets';

			return $query_vars;
		}

		public function load_wcfm_vendor_page($endpoint)
		{
			if ($endpoint == 'chat-widgets') { ?>
				<div class="collapse wcfm-collapse" id="wcfm_chat_widgets">
					<div class="wcfm-page-headig">
						<span class="wcfmfa fa-comment-alt"></span>
						<span class="wcfm-page-heading-text"><?php echo apply_filters('wcfm_sold_by_label', '', __('Store', 'cwmm')) . ' ' . __('Chat Widgets', 'cwmm'); ?></span>
						<?php do_action('wcfm_page_heading'); ?>
					</div>
					<div class="wcfm-collapse-content">
						<div id="wcfm_page_load"></div>
					</div>

					<div id="cwmm_app"></div>

				</div>
			<?php }
		}

		public function add_chat_widgets_menu_wcfm($menus)
		{
			global $WCFM;

			if (cwmm_can_vendor()) {
				$wcfm_page = get_wcfm_page();

				$chat_widgets_menus = array(
					'wcfm-chat-widgets' => array(
						'label'    => __('Chat Widgets', 'cwmm'),
						'icon'     => 'wcfm-vendor-icon',
						'url'      => wcfm_get_endpoint_url('chat-widgets', '', $wcfm_page),
						'priority' => 46,
					)
				);

				$menus = array_merge($menus, $chat_widgets_menus);
			}

			return $menus;
		}


		// dokan
		public function add_endpoint()
		{
			flush_rewrite_rules(false);
			add_rewrite_endpoint('chat-widgets', EP_ROOT | EP_PAGES);
		}

		public function render_chat_widget_content()
		{
			echo '<div id="cwmm_app"></div>';
		}

		public function add_chat_widgets_menu_dokan($urls)
		{
			if (cwmm_can_vendor()) {
				$urls['chat-widgets'] = array(
					'title' => esc_html('Chat Widgets'),
					'icon'  => sprintf('<img style="width: 20px;margin-right: 8px;" src="%s/images/icon.svg" />', CWMM_ASSETS),
					'url'   => dokan_get_navigation_url('chat-widgets'),
					'pos'   => 70,
				);
			}

			return $urls;
		}


		public function load_chat_widget_template($query_vars)
		{

			if (isset($query_vars['chat-widgets'])) {
				cwmm_get_template('chat-widgets');
			}
		}

		public function render_dokan_widget()
		{
			global $product;

			if ('on' === $this->settings['disable_multivendor_widgets']) {
				$vendor_id = 0;
			} else {
				$vendor_id = get_post_field('post_author', $product->get_id());
			}


			ob_start();
			cwmm_render_widget($vendor_id);
			$html = ob_get_clean();

			if (!empty($html)) { ?>
				<?php echo $html; ?>
			<?php }
		}

		public function render_dokan_vendor_info_widget()
		{
			global $product;
			$vendor_id = get_post_field('post_author', $product->get_id());

			ob_start();
			cwmm_render_widget($vendor_id, 'vendor_info_widget');
			$html = ob_get_clean();

			if (!empty($html)) { ?>
				<?php echo $html; ?>
			<?php }
		}

		public function render_wcfm_vendor_info_widget($vendor_id)
		{

			ob_start();
			cwmm_render_widget($vendor_id);
			$html = ob_get_clean();

			if (!empty($html)) { ?>
				<div class="clearfix vendor-contact">
					<?php echo $html; ?>
				</div>
			<?php }
		}

		public function render_wcmp_widget($content)
		{

			if (function_exists('is_product') && is_product()) {
				global $post;

				$vendor_id = $post->post_author;


				ob_start();
				cwmm_render_widget($vendor_id);
				$html = ob_get_clean();

				if (!empty($html)) {
					$content .= sprintf('<div class="clearfix vendor-contact">%s</div>', $html);
				}
			}

			return $content;
		}

		public function render_wcmp_vendor_info_widget()
		{
			global $product;
			$vendor_id = get_post_field('post_author', $product->get_id());

			ob_start();
			cwmm_render_widget($vendor_id, 'vendor_info_widget');
			$html = ob_get_clean();

			if (!empty($html)) { ?>
				<?php echo $html; ?>
<?php }
		}

		// Render widget
		public function render_widget()
		{
			$user_id = 0;
			$disable_multivendor = cwmm_get_settings('disable_multivendor_widgets');

			if ('on' == cwmm_get_settings('vendor_enable', 'on')) {

				if (function_exists('dokan_is_store_page')) {
					if (dokan_is_store_page()) {
						$store_user = dokan()->vendor->get(get_query_var('author'));
						$user_id    = 'on' === $disable_multivendor ? '0' : $store_user->id;
					}


					if (is_product()) {
						global $product;

						$vendor = dokan_get_vendor_by_product($product);
						if (!empty($vendor)) {
							$user_id = 'on' === $disable_multivendor ? '0' : $vendor->get_id();
						}
					}
				}

				if (function_exists('wcfmmp_is_store_page')) {

					if (wcfmmp_is_store_page()) {
						$wcfm_store_url  = wcfm_get_option('wcfm_store_url', 'store');
						$wcfm_store_name = apply_filters('wcfmmp_store_query_var', get_query_var($wcfm_store_url));
						if (empty($wcfm_store_name)) {
							return;
						}
						$seller_info = get_user_by('slug', $wcfm_store_name);
						if (!$seller_info) {
							return;
						}

						$store_user = wcfmmp_get_store($seller_info->ID);
						$user_id    = 'on' === $disable_multivendor ? '0' : $store_user->get_id();
					}


					if (is_product()) {
						global $product;

						$vendor_id = wcfm_get_vendor_id_by_post($product->get_id());
						if (!empty($vendor_id)) {
							$user_id =  'on' === $disable_multivendor ? '0' : $vendor_id;
						}
					}
				}

				if (function_exists('mvx_is_store_page')) {
					if (mvx_is_store_page()) {
						$user_id = mvx_find_shop_page_vendor();
					}


					if (is_product()) {
						global $product;

						$vendor = get_mvx_product_vendors($product->get_id());
						if (!empty($vendor)) {
							$user_id = 'on' === $disable_multivendor ? '0' : $vendor->get_id();
						}
					}
				}


				// if ( $user_id == 0 ) {

				// 	if ( function_exists( 'dokan_is_seller_dashboard' ) && dokan_is_seller_dashboard() ) {
				// 		return;
				// 	}


				// 	if ( function_exists( 'is_wcfm_page' ) && is_wcfm_page() ) {
				// 		return;
				// 	}

				// 	if ( function_exists( 'is_vendor_dashboard' ) && is_vendor_dashboard() ) {
				// 		return;
				// 	}
				// }

			}

			cwmm_render_widget($user_id);
		}

		/**
		 * @return CWMM_Hooks|null
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

CWMM_Hooks::instance();
