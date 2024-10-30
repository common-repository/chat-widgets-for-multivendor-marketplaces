<?php
$licence_deactive  = apply_filters('cwmm/is_pro', false);
$pro_activate = CWMM_Admin::cwmmpro_activation_status();
?>
<?php if ($pro_activate  && !$licence_deactive) : ?>
    <div class="licence-activation-area">
        <h3> Please Active your license <a href="<?php echo admin_url('admin.php?page=cwmm-license'); ?>">Activate</a> </h3>
    </div>

<?php endif; ?>