(function ($) {

  //  const promodata = JSON.parse(cwmm.promodata);

  //  var ex_date =  new Date( promodata.counter_time );

  //   var tmr = window.setInterval(function () {
  //       var d = new Date();
  //       var dif = ex_date - d;
  //       var s = parseInt(dif / 1000);
  //       if (s < 0) {
  //           window.clearInterval(tmr);
  //           return;
  //       }

  //       var sec = s % 60;
  //       var m = parseInt(s / 60);
  //       var min = m % 60;
  //       var h = parseInt(m / 60);
  //       var hour = h % 24;
  //       d = parseInt(h / 24);
  //       $(".timeElements .time .end-time").text( d);
  //       $(".timeElements .time .end-hour").text( hour);
  //       $(".timeElements .time .end-minutes").text(min);
  //       $(".timeElements .time .end-second").text( sec);

  //   }, 1000);
 


  $(".cwmm-unlock-btn a").on("click", function (e) {
        e.preventDefault();
        WPPOOL.Popup("chat_widgets_for_multivendor_marketplaces").show();
  });

  // $(".cwmm-pro-popup .close_btn").on("click", function () {
  //   $(".cwmm-pro-popup").hide();
  // });

  // $(".cwmm-pro-popup").on("click", function () {
  //   $(this).hide();
  // });


//Get help popup

$('.cwmm-support-popup').on('click', function() {
  $(this).hide();
});

$('.cwmm-popup').on('click', function(e) {
  e.stopPropagation();
});


  $( '.cwmm-support-popup #cwmm_copy_mail' ).on("click", function(e){
     e.stopPropagation();

     var copyElem = $('#cwmm_support_mail');
     var $temp = $("<input>");
    
    $("body").append($temp);
    $temp.val($(copyElem).text()).select();
   
    if (document.execCommand('copy')) {
      $temp.remove();  
      copyElem.hide();
      $("#support_mail_copied").fadeIn(500,function(){    
        $("#support_mail_copied").fadeOut(500,function(){
          copyElem.show();
        } );
        
      });
     
    } 

    
 });

 $('.cwmm-support-popup .close_btn').on("click", function(){
  $('.cwmm-support-popup').hide();
});

$('#cwmm_get_help').on("click", function(){
  $('.cwmm-support-popup').show();
});



})(jQuery);