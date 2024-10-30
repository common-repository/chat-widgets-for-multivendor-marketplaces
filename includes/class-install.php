<?php

defined('ABSPATH') || exit;

/**
 * Class Install
 */
class CWMM_Install
{
	/**
	 * Plugin activation stuffs
	 *
	 * @since 1.0.0
	 */
	public static function activate()
	{
		update_option('redirect_to_cwmm_page', absint(1));

		self::create_default_data();
		self::create_tables();
	}


	private static function create_tables()
	{
		global $wpdb;
		$wpdb->hide_errors();
		require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

		$tables = [

			//ip table
			"CREATE TABLE IF NOT EXISTS {$wpdb->prefix}cwmm_chat_widgets(
         	id bigint(20) NOT NULL AUTO_INCREMENT,
         	vendor_id bigint(20) NOT NULL,
			title text NOT NULL DEFAULT '',
			status varchar(128)  NOT NULL DEFAULT '',
			widgets text NOT NULL DEFAULT '',
    		config longtext NOT NULL DEFAULT '',
    
			created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
			PRIMARY KEY  (id)
            ) ENGINE=InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;",

		];

		foreach ($tables as $table) {
			dbDelta($table);
		}
	}

	/**
	 * Create plugin settings default data
	 *
	 * @since 1.0.0
	 */
	private static function create_default_data()
	{

		$version      = get_option('cwmm_version', '0');
		$install_time = get_option('cwmm_install_time', '');

		if (empty($version)) {
			update_option('cwmm_version', CWMM_VERSION);
		}

		if (!empty($install_time)) {
			$date_format = get_option('date_format');
			$time_format = get_option('time_format');
			update_option('cwmm_install_time', date($date_format . ' ' . $time_format));
		}

		update_option('cwmm_flush_rewrite_rules', true);
	}
}
