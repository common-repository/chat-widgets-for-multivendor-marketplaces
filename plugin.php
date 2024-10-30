<?php

/**
 * Plugin Name: Chat Widget
 * Plugin URI:  https://go.wppool.dev/0zt
 * Description: Chat Widgets is a one click chat widget to let visitors chat with your vendors via their favorite channels i.e whatsapp, facebook messenger, messages, slack, email, telegram, sms, call button. Show chat buttons anywhere in your vendor’s shop and product pages.
 * Version:     2.1.1
 * Author:      WPPOOL
 * Author URI:  https://wppool.dev/
 * Text Domain: cwmm
 * Domain Path: /languages/
 */

// don't call the file directly
if (!defined('ABSPATH')) {
	wp_die(__('You can\'t access this page', 'cwmm'));
}


/** define constants */
if (!defined('CWMM_VERSION')) {
	define('CWMM_VERSION', '2.1.1');
	define('CWMM_FILE', __FILE__);
	define('CWMM_PATH', dirname(CWMM_FILE));
	define('CWMM_INCLUDES', CWMM_PATH . '/includes');
	define('CWMM_URL', plugins_url('', CWMM_FILE));
	define('CWMM_ASSETS', CWMM_URL . '/assets');
	define('CWMM_TEMPLATES', CWMM_PATH . '/templates');
}

//activation
register_activation_hook(CWMM_FILE, function () {
	include_once CWMM_INCLUDES . '/class-install.php';

	CWMM_Install::activate();
});



//Include the base plugin file.
include_once CWMM_INCLUDES . '/base.php';

if (file_exists(CWMM_INCLUDES  . '/WPPOOL/Plugin.php')) {
	require_once CWMM_INCLUDES . '/WPPOOL/Plugin.php';
}


// function delete_item(  ) {
// 	$id = 0;

// 	global $wpdb;
// 	$table = $wpdb->prefix . 'cwmm_chat_widgets';

// 	$wpdb->delete( $table, [ 'id' => $id ], [ '%d' ] );
// }

// delete_item();