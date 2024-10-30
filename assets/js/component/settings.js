
(function ($) {

  //Initilize Toaster
  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "2000",
    "extendedTimeOut": "2000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};


  function enable_save_btn(){
    $("#cwmm_save_settings").text("Save settings");
    $("#cwmm_save_settings").addClass("settings-hover");
    $("#cwmm_save_settings").removeClass("bg-white");
    $("#cwmm_save_settings").removeClass("text-primary");
    $("#cwmm_save_settings").css({"background": "#B78DEB", "color": "#FFFFFF","cursor": "pointer"})
    $("#cwmm_save_settings").prop('disabled', false);
    $("#cwmm_save_settings").removeClass("cursor-default");
  }

  function disable_save_btn(){
    $("#cwmm_save_settings").text("Saved");
    $("#cwmm_save_settings").removeClass("settings-hover");
    //$("#cwmm_save_settings").css({"background": "#FFFFFF", "color": "#C2AEDC"});
    $("#cwmm_save_settings").css({"cursor": "default"});
    $("#cwmm_save_settings").addClass("bg-white");
    $("#cwmm_save_settings").addClass("text-primary");
    $("#cwmm_save_settings").prop('disabled', true);
  }

  $(".checkbox").on("click", function () {
    $(this).toggleClass("active");
    enable_save_btn();
  });


  $(".disable_widgets_checkbox").on("click", function () {
   
    if( $(".disable_multivendor_widgets").hasClass("active")){
        $(this).removeClass("active");
        enable_save_btn();
    }else{
      $(".settings-modal").show();
    }
  });

  $(".cwmm-disabled-widget-popup .close_btn").on("click", function () {
    $(".settings-modal").hide();
  });

  $(".popup-btn-wrapper .cancel-btn").on("click", function () {
    $(".settings-modal").hide();
  });

  $(".popup-btn-wrapper .proceed-btn").on("click", function () {
    $(".settings-modal").hide();
    $(".disable_widgets_checkbox").addClass("active");
    enable_save_btn();
  });

  $(".settings-modal").on("click", function () {
    $(this).hide();
  });


  //Get Settings Data
  var settings = {};

  function getSettings() {
    wp.apiFetch({
      path: `cwmm/v1/settings/`,
    }).then(({ data }) => {
      settings = data;
      // Change vendor to normal mode if plugin deactivate
      if (!cwmm.multivendor_active && "on" == data.vendor_enable) {
        var kk_data = {
          vendor_enable: "off",
          admin_default_enable: "off",
          vendor_customization_enable: "off",
          vendor_triggers_enable: "off",
        };

        updateSettings(kk_data);
      }
    });
  }

  getSettings();

  //When click Change mode
  $("#mode-switcher").on("click", function () {
    getSettings();
    $("#modeSwitcherSection").show();
    $(".modechange-wrap").hide();
    $(".settings-page-footer").hide();
    $(".settings-wrap").hide();
  });

  //Mode close btn
  $(".mode-btn-wrapper .close-btn").on("click", function () {
    var mode = $(".mode-btn-wrapper .save-btn").attr("data-mode");
    $("#modeSwitcherSection").hide();
    $(".modechange-wrap").show();
    
    if (settings.vendor_enable == "on") {
      $(".settings-wrap").show();
      $(".modeSwitcher__wrapper .left_content input").prop("checked", true);
      $(".left_content").addClass("border-active");
      $(".right_content").removeClass("border-active");
      $(".settings-page-footer").show();
    } else if (settings.vendor_enable == "off") {
      $(".settings-wrap").hide();
      $(".modeSwitcher__wrapper .right_content input").prop("checked", true);
      $(".right_content").addClass("border-active");
      $(".left_content").removeClass("border-active");
      $(".settings-page-footer").hide();
    }
  });

  //Mode change border active
  $(".mode-input").on("change", function () {
    var mode = $(this).attr("data-mode");
    $(".mode-btn-wrapper .save-btn").show();
    if ("multivendor" === mode) {
      $(".left_content").addClass("border-active");
      $(".right_content").removeClass("border-active");
      $(".mode-btn-wrapper .save-btn").attr("data-mode", "multivendor");
    } else if ("normal" === mode) {
      $(".right_content").addClass("border-active");
      $(".left_content").removeClass("border-active");
      $(".mode-btn-wrapper .save-btn").attr("data-mode", "normal");
    }
  });

  $("#cwmm_save_settings").on("click", function () {
    const btn = $(this);
    var data;
    var multivendorMode = $(".modeSwitcher__wrapper .left_content input").prop("checked");
    var normalMode = $(".modeSwitcher__wrapper .right_content input").prop("checked");

    if( true === multivendorMode ){
       data = {
        vendor_enable: "on",
        admin_default_enable: $(".checkbox.admin_default_enable").hasClass(
          "active"
        )
          ? "on"
          : "off",
        vendor_customization_enable: $(
          ".checkbox.vendor_customization_enable"
        ).hasClass("active")
          ? "on"
          : "off",
        vendor_triggers_enable: $(".checkbox.vendor_triggers_enable").hasClass(
          "active"
        )
          ? "on"
          : "off",
        disable_multivendor_widgets: $(".disable_widgets_checkbox.disable_multivendor_widgets").hasClass(
          "active"
        )
          ? "on"
          : "off",
      }
    }else if( true === normalMode ){
      data = {
        vendor_enable: "off",
        admin_default_enable: "off",
        vendor_customization_enable: "off",
        vendor_triggers_enable: "off",
        disable_multivendor_widgets: "off",
      }
    }else{
      data = {};
    }

    btn.text("Saving...");

    wp.apiFetch({
      method: "POST",
      path: `cwmm/v1/settings/`,
      headers: {
        "Content-Type": "application/json",
        "X-WP-Nonce": cwmm.nonce,
      },
      data,
    }).then((res) => {
      if( res.success == true ){
        Command: toastr["success"]("Settings saved successfully");
      }else{
        Command: toastr["error"]("Failed, please try again!");
      }
      disable_save_btn();
    });
  });

  //Save Settings Mode Change
  $(".mode-btn-wrapper .save-btn").on("click", function () {
    var modeType = $(this).attr("data-mode");

    let settings_data = {};

    if ("normal" === modeType) {
      settings_data = {
        vendor_enable: "off",
        admin_default_enable: "off",
        vendor_customization_enable: "off",
        vendor_triggers_enable: "off",
        disable_multivendor_widgets: "off",
      };
      $(".settings-page-footer").hide();
    }

    if ("multivendor" === modeType) {
      settings_data = {
        vendor_enable: "on",
        admin_default_enable: "on",
        vendor_customization_enable: "on",
        vendor_triggers_enable: "on",
        disable_multivendor_widgets: "off",
      };
      $(".settings-page-footer").show();
    }

    updateSettings(settings_data);
    updateFrontend(modeType);

    $("#modeSwitcherSection").hide();
    $(".modechange-wrap").show();
  });

  //Update Settings
  function updateSettings(settings_data) {
    wp.apiFetch({
      method: "POST",
      path: `cwmm/v1/settings/`,
      headers: {
        "Content-Type": "application/json",
        "X-WP-Nonce": cwmm.nonce,
      },

      data: settings_data,
    }).then(({ data, success }) => {});
  }

  //Update Frontend
  function updateFrontend(modeType) {
    if ("multivendor" === modeType) {
      $(".settings-subtitle").text("Multivendor Mode");
      $(".settings-wrap").show();
      $(".modechange-wrap .content .title h1").text("Using Multivendor Mode");
      $(".modechange-wrap .content .title .setting-tooltip .tooltiptext").text("Currently you are using Multivendor Mode. This is recommended if you have a multivendor website. Add your favorite channels anywhere on your website using this mode.");
      $(".checkbox.admin_default_enable").addClass("active");
      $(".checkbox.vendor_customization_enable").addClass("active");
      $(".checkbox.vendor_triggers_enable").addClass("active");
      $(".disable_widgets_checkbox.disable_multivendor_widgets").removeClass("active");
      $(".cwmm-settings-page").removeClass("settings-min-height");
    } else if ("normal" === modeType) {
      $(".settings-subtitle").text("Normal Mode");
      $(".settings-wrap").hide();
      $(".modechange-wrap .content .title h1").text("Using Normal Mode");
      $(".modechange-wrap .content .title .setting-tooltip .tooltiptext").text("Currently you are using Normal Mode. This is for regular Chat Widgets experience. Add your favorite channels anywhere on your website using this mode.");
      $(".checkbox.admin_default_enable").removeClass("active");
      $(".checkbox.vendor_customization_enable").removeClass("active");
      $(".checkbox.vendor_triggers_enable").removeClass("active");
      $(".disable_widgets_checkbox.disable_multivendor_widgets").removeClass("active");
      $(".cwmm-settings-page").addClass("settings-min-height");
    }
  }

  //get pro menu click
  $("#cwmm-get-pro-menu").on("click", function (e) {
    e.preventDefault();

    const win = window.open("https://go.wppool.dev/Miji/", "_blank");
    if (win) {
      //Browser has allowed it to be opened
      win.focus();
    } else {
      //Browser has blocked it
      alert("Please allow popups for this website");
    }
  });
  
})(jQuery);
