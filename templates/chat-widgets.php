<?php do_action( 'dokan_dashboard_wrap_start' ); ?>

	<div class="dokan-dashboard-wrap">

		<?php

		/**
		 *  dokan_dashboard_content_before hook
		 *  chat_widgets_content_before hook
		 *
		 *  @hooked get_dashboard_side_navigation
		 *
		 *  @since 2.4
		 */
		do_action( 'dokan_dashboard_content_before' );
		do_action( 'chat_widgets_content_before' );
		?>

		<div class="dokan-dashboard-content chat-widgets-content">

			<?php

			/**
			 *  chat_widgets_content_inside_before hook
			 *
			 *  @since 2.4
			 */
			do_action( 'chat_widgets_content_inside_before' );
			?>

			<article class="chat-widgets-area">

				<?php
				/**
				 * chat_widgets_header_render hook
				 *
				 * @hooked dokan_coupon_header_render
				 *
				 * @since 2.4
				 */
				do_action( 'chat_widgets_content_area_header' );
				?>

				<div class="entry-content">

					<?php
					/**
					 * chat_widgets_header_render hook
					 *
					 * @hooked dokan_render_withdraw_error
					 * @hooked chat_widgets_status_filter
					 * @hooked dokan_show_seller_balance
					 * @hooked chat_widgets_form_and_listing
					 *
					 * @since 2.4
					 */
					do_action( 'chat_widgets_content' );
					?>

				</div><!-- .entry-content -->

			</article>

			<?php

			/**
			 *  chat_widgets_content_inside_after hook
			 *
			 *  @since 2.4
			 */
			do_action( 'chat_widgets_content_inside_after' );
			?>
		</div><!-- .dokan-dashboard-content -->

		<?php
		/**
		 *  dokan_dashboard_content_after hook
		 *  chat_widgets_content_after hook
		 *
		 *  @since 2.4
		 */
		do_action( 'dokan_dashboard_content_after' );
		do_action( 'chat_widgets_content_after' );
		?>
	</div><!-- .dokan-dashboard-wrap -->

<?php do_action( 'dokan_dashboard_wrap_end' ); ?>