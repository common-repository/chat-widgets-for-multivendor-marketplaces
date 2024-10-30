<?php

defined( 'ABSPATH' ) || exit;

require_once CWMM_INCLUDES . '/class-rest-api-controller.php';

if ( ! class_exists( 'CWMM_Rest_Api' ) ) {
	class CWMM_Rest_Api {
		/** @var null */
		private static $instance = null;

		/**
		 * CWMM_Rest_Api constructor.
		 *
		 */
		public function __construct() {
			add_action( 'rest_api_init', [ $this, 'register_api' ] );
		}

		/**
		 * Register rest API
		 *
		 * @since 1.0.0
		 */
		public function register_api() {
			$controller = CWMM_Rest_Api_Controller::instance();

			$controller->register_routes();
		}

		/**
		 * @return CWMM_Rest_Api|null
		 */
		public static function instance() {
			if ( is_null( self::$instance ) ) {
				self::$instance = new self();
			}

			return self::$instance;
		}
	}

}

CWMM_Rest_Api::instance();