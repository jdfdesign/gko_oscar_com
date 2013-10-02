//= require jquery_ujs
//= require remote_form
//= require portfolio
//= require jquery.placeholder
//= require jquery.mixitup.min
//= require jquery.fitvids

// make console.log safe to use
window.console || (console = {
  log: function() {}
});

jQuery(function($){
  'use strict';
  var THEME = window.THEME || {};


  THEME.anim = function(){
    /* Starting Animation on Load */
    $('<img/>').attr('src', 'images/background.jpg').load(function() {
    	jQuery('#logo').fadeIn(600, function() {
    		jQuery('h1').animate({opacity: '1', 'padding-top': '0'}, 500,function() {
    			jQuery('.text').animate({opacity: '1', 'padding-top': '0'}, 500,function() {
    				if(jQuery(window).width()<767){	
    					jQuery('#explore').animate({opacity: '1', 'margin-top': '2em'}, 1000);
    				} else {
    					jQuery('#explore').animate({opacity: '1', 'margin-top': '4em'}, 1000);
    				}
    			});
    		});
    	});
    });
  }
  THEME.textCenter = function(){
    $('.text-container').css({
      position:'absolute'
    });

    $('.text-container').css({
      left: ($(window).width() - $('.text-container').outerWidth())/2,
      top: ($(window).height() - 100 - $('.text-container').outerHeight())/2
    });
  }
  
  /*-----------------------------------------------------------------------------------*/
	/*	Navigation
	/*-----------------------------------------------------------------------------------*/
	
	var animate = 'down';
	
	THEME.navigation = function(){ 
	  jQuery('.navbar').css({top: $(window).height() - 100});
	  
	  jQuery(window).bind('scroll', function () {
	
  		/* Animation for Top Navigation */
  		var scrollTop = jQuery(window).scrollTop();
		
  		if (scrollTop > jQuery('#cars').offset().top-60 && animate == 'down') {
  			animate='up';
  			jQuery('.navbar').stop().animate({top:'0'}, 300);
  		} else if(scrollTop < jQuery('#cars').offset().top-60 && animate == 'up'){
  			animate='down';
  			jQuery('.navbar').stop().animate({top:$(window).height() - 100}, 300);
  		}
	  });
	}
	
  /* ==================================================
  	Fix
  ================================================== */

  THEME.fix = function(){
    // fix for ie device_width bug 
    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
      var msViewportStyle = document.createElement("style");
      msViewportStyle.appendChild(
      document.createTextNode("@-ms-viewport{width:auto!important}"));
      document.getElementsByTagName("head")[0].
      appendChild(msViewportStyle);
    }
  };
  
  /* ==================================================
  	Placeholder
  ================================================== */

  THEME.placeholder = function(){
    // enable placeholder fix for old browsers
    $('input, textarea').placeholder();
  };

  /* ==================================================
  	Scroll to Top
  ================================================== */

  THEME.scrollToTop = function(){
  	var didScroll = false;

  	var $arrow = $('#back-to-top');

  	$arrow.click(function(e) {
  		$('body,html').animate({ scrollTop: "0" }, 750, 'easeOutExpo' );
  		e.preventDefault();
  	});

  	$(window).scroll(function() {
  		didScroll = true;
  	});

  	setInterval(function() {
  		if( didScroll ) {
  			didScroll = false;

  			if( $(window).scrollTop() > 1000 ) {
  				$arrow.css('display', 'block');
  			} else {
  				$arrow.css('display', 'none');
  			}
  		}
  	}, 250);
  };

  /* ==================================================
     Responsive Video
  ================================================== */

  THEME.video = function(){
  	$('.videoWrapper, .video-embed').fitVids();
  };
/*==================================================
  	Init
==================================================*/

  $(document).ready(function() {
    Portfolio.init();
    THEME.fix(); 
    THEME.textCenter();
    THEME.navigation();
    THEME.scrollToTop();
    THEME.placeholder();
    THEME.video();
  });

}); 
