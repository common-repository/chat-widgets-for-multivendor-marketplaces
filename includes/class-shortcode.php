<?php

defined( 'ABSPATH' ) || exit();

if ( ! class_exists( 'CWMM_Shortcode' ) ) {
	class CWMM_Shortcode {

		/**
		 * @var null
		 */
		private static $instance = null;

		/**
		 * CWMM_Shortcode constructor.
		 */
		public function __construct() {
		}

		/**
		 * @param $atts
		 *
		 * @return false|string
		 * @since 1.0.0
		 */
		public function cb( $atts ) {
			$atts = shortcode_atts( array(), $atts );

			ob_start();
			cwmm_get_template( '', $atts );

			return ob_get_clean();
		}

		/**
		 * @return CWMM_Shortcode|null
		 */
		public static function instance() {
			if ( is_null( self::$instance ) ) {
				self::$instance = new self();
			}

			return self::$instance;
		}
	}
}

CWMM_Shortcode::instance();