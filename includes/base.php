<?php

defined('ABSPATH') || exit();

final class CWMM
{


	/**
	 * The single instance of the class.
	 *
	 * @var CWMM
	 * @since 1.0.0
	 */
	protected static $instance = null;

	/**
	 * CWMM constructor.
	 */
	public function __construct()
	{
		//add_action( 'admin_notices', [ $this, 'render_woocommerce_missing_notice' ] );
		//add_action( 'admin_notices', [ $this, 'render_vendor_missing_notice' ] );

		add_filter('plugin_action_links_' . plugin_basename(CWMM_FILE), array($this, 'action_links'));

		//add_action( 'woocommerce_loaded', [ $this, 'init_plugin' ] );

		$this->appsero_init_tracker();

		$this->init_hooks();
		$this->includes();

		do_action('cwmm_loaded');
	}

	/**
	 * Initialize the plugin tracker
	 *
	 * @return void
	 */
	function appsero_init_tracker()
	{

		if (!class_exists('Appsero\CWMM\Client')) {
			require_once CWMM_PATH . '/appsero/src/Client.php';
		}

		$client = new Appsero\CWMM\Client('a61c7bee-0711-4eb4-8cfd-49ad1d9a9658', 'Chat Widgets', CWMM_FILE);

		// Active insights
		$client->insights()->init();
	}

	/**
	 * Ensure theme and server variable compatibility
	 *
	 * @return void
	 * @since 1.0.0
	 *
	 */
	public function render_vendor_missing_notice()
	{
		$has_woocommerce = class_exists('WooCommerce');

		$has_vendor = function_exists('dokan') || class_exists('WCFMmp') || class_exists('MVX');


		if (!$has_woocommerce && !$has_vendor) {
			include_once CWMM_INCLUDES . '/views/missing-vendor-notice.php';
		}
	}

	public function render_woocommerce_missing_notice()
	{
		$has_woocommerce = class_exists('WooCommerce');

		if (!$has_woocommerce) {
			include_once CWMM_INCLUDES . '/views/missing-woocommerce-notice.php';
		}
	}

	public function action_links($links)
	{
		$links[] = sprintf('<a href="%1$s">%2$s</a>', admin_url('admin.php?page=cwmm-settings'), __('Settings', 'cwmm'));

		if (!apply_filters('cwmm/is_pro', false)) {
			$links[] = sprintf(
				'<a href="%1$s" target="_blank" style="color: orangered;font-weight: bold;">%2$s</a>',
				'https://go.wppool.dev/EiRM',
				__('GET PRO', 'cwmm')
			);
		}

		return $links;
	}


	/**
	 * Include required core files used in admin and on the frontend.
	 *
	 * @return void
	 * @since 1.0.0
	 *
	 */
	public function includes()
	{

		//core includes
		include_once CWMM_INCLUDES . '/wppool.product.php';
		include_once CWMM_INCLUDES . '/functions.php';
		include_once CWMM_INCLUDES . '/class-enqueue.php';
		include_once CWMM_INCLUDES . '/class-hooks.php';
		include_once CWMM_INCLUDES . '/class-shortcode.php';
		include_once CWMM_INCLUDES . '/class-rest-api.php';
		include_once CWMM_INCLUDES . '/class-rest-api-controller.php';

		//admin includes
		if (is_admin()) {
			include_once CWMM_INCLUDES . '/class-admin.php';
		}
	}

	/**
	 * Hook into actions and filters.
	 *
	 * @since 1.0.0
	 */
	private function init_hooks()
	{

		add_action('admin_notices', [$this, 'print_notices'], 15);

		//Localize our plugin
		add_action('init', [$this, 'localization_setup']);
	}


	/**
	 * Initialize plugin for localization
	 *
	 * @return void
	 * @since 1.0.0
	 *
	 */
	public function localization_setup()
	{
		load_plugin_textdomain('cwmm', false, CWMM_PATH . '/languages/');
	}


	public function add_notice($class, $message)
	{

		$notices = get_option(sanitize_key('cwmm_notices'), []);
		if (is_string($message) && is_string($class) && !wp_list_filter($notices, array('message' => $message))) {

			$notices[] = array(
				'message' => $message,
				'class'   => $class,
			);

			update_option(sanitize_key('cwmm_notices'), $notices);
		}
	}

	/**
	 * Prince admin notice
	 *
	 * @return void
	 * @since 1.0.0
	 *
	 */
	public function print_notices()
	{
		$notices = get_option(sanitize_key('cwmm_notices'), []);
		foreach ($notices as $notice) { ?>
			<div class="notice notice-large is-dismissible wp-cwmm-notice notice-<?php echo esc_attr($notice['class']); ?>">
				<?php echo $notice['message']; ?>
			</div>
<?php
			update_option(sanitize_key('cwmm_notices'), []);
		}
	}


	/**
	 * Main CWMM Instance.
	 *
	 * Ensures only one instance of CWMM is loaded or can be loaded.
	 *
	 * @return CWMM - Main instance.
	 * @since 1.0.0
	 * @static
	 */
	public static function instance()
	{

		if (is_null(self::$instance)) {
			self::$instance = new self();
		}

		return self::$instance;
	}
}

//kickoff cwmm
if (!function_exists('cwmm')) {
	function cwmm()
	{
		return CWMM::instance();
	}
}

cwmm();
