/*-----------------------------------*/


function iOSversion() {
  if (/iP(hone|od|ad)/.test(navigator.platform)) {
    var e = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
    return [parseInt(e[1], 10), parseInt(e[2], 10), parseInt(e[3] || 0, 10)]
  }
}(function(e) {
  e("#header_menu h1, .toggle").click(function() {
    e("#mobile_menu").slideToggle();
    e(".toggle").toggleClass("flip");
    return !1
  });
  e(window).resize(function() {
    if (e(window).width() > 700) {
      e("#mobile_menu").css("display", "none");
      e(".toggle").removeClass("flip")
    }
  });
  e(".royalSlider").css("display", "block");
  e("input#mc_mv_EMAIL").val("Your email address ...");
  e("input#mc_mv_EMAIL").focus(function() {
    e(this).val("")
  }).blur(function() {
    e(this).val() === "" && e(this).val("Your email address ...")
  });
  e("a#button_see_all_sponsors").click(function() {
    e(this).css("display", "none");
    e("#sponsors_more").slideToggle("fast", function() {});
    return !1
  });
  e("#sponsors_more a.button").click(function() {
    e("#sponsors_more").slideToggle("fast", function() {
      e("a#button_see_all_sponsors").css("display", "inline-block")
    });
    return !1
  });
  e("a#footer_house").click(function() {
    e("html, body").animate({
      scrollTop: 0
    }, "fast");
    return !1
  })
})(jQuery);
var check = {
  isIOS: function() {
    return jQuery("html").hasClass("iphone") || jQuery("html").hasClass("ipad") ? !0 : !1
  },
  isOldIE: function() {
    return jQuery("html").hasClass("oldie") ? !0 : !1
  },
  isIpad: function() {
    return jQuery("html").hasClass("ipad") ? !0 : !1
  },
  isIphone: function() {
    return jQuery("html").hasClass("iphone") ? !0 : !1
  },
  isAndroid: function() {
    var e = navigator.userAgent.toLowerCase(),
        t = e.indexOf("android") > -1;
    return t
  },
  isTouch: function() {
    return Modernizr.touch
  }
};
navigator.sayswho = function() {
  var e = navigator.userAgent,
      t = navigator.appName,
      n, r = e.match(/(opera|chrome|safari|firefox|msie|trident)\/?\s*([\d\.]+)/i) || [];
  r = r[2] ? [r[1], r[2]] : [t, navigator.appVersion, "-?"];
  r && (n = e.match(/version\/([\.\d]+)/i)) !== null && (r[2] = n[1]);
  return r.join(" ")
}();
site = {
  home: {
    init: function() {
      (function(e) {
        function t() {
          var t = 0;
          if (check.isIOS()) {
            ver = iOSversion();
            if (ver[0] >= 7) {
              var n = navigator.sayswho;
              n.indexOf("Safari") !== -1 && (t = 26)
            }
          }
          navHeight = 50;
          yDistance = Number(e(window).height() - t) - navHeight;
          e("#header_area, .headerSlider").css("height", yDistance)
        }
        t();
        e(window).resize(function() {
          t()
        });
        site.windowScrollResize(yDistance);
        e(window).scroll(function() {
          site.windowScrollResize(yDistance)
        });
        e(window).on("hashchange", function(t) {
          var n = e.param.fragment(e(this).attr("href"));
          n === "about" && e("html, body").stop().animate({
            scrollTop: yDistance
          }, 800)
        }).trigger("hashchange");
        e("#header_menu ul li:first a").first().on("click", function() {
          e("html, body").stop().animate({
            scrollTop: e(".top").offset().top - 50
          }, 800)
        });
        e("#expanded_content_open").on("click", function() {
          e(this).css("display", "none");
          e(this).next().slideToggle("fast", function() {
            e("#expanded_content_close").css("display", "inline-block")
          })
        });
        e("#expanded_content_close").on("click", function() {
          e(this).css("display", "none");
          e(this).prev().slideToggle("fast", function() {
            e("#expanded_content_open").css("display", "inline-block")
          })
        });
        e(".headerSlider").royalSlider({
          controlNavigation: "bullets",
          arrowsNav: !1,
          imageScaleMode: "fill",
          sliderDrag: !1,
          slidesSpacing: 0,
          keyboardNavEnabled: !1,
          navigateByClick: !0,
          numImagesToPreload: 2,
          usePreloader: !0,
          loop: !0,
          block: {
            fadeEffect: !0,
            moveEffect: "right",
            moveOffset: 500,
            speed: 800
          },
          autoPlay: {
            enabled: !0,
            delay: 5e3,
            stopAtAction: !0
          }
        });
        e(".supplierSlider").royalSlider({
          controlNavigation: "bullets",
          arrowsNav: !1,
          imageScalePadding: 0,
          loop: !0,
          imageScaleMode: "fill",
          autoPlay: {
            enabled: !0,
            delay: 5e3,
            stopAtAction: !1
          }
        });
        e(".promoSlider").royalSlider({
          controlNavigation: "bullets",
          arrowsNav: !1,
          imageScalePadding: 0,
          imageScaleMode: "fill",
          autoPlay: {
            enabled: !0,
            delay: 5e3,
            stopAtAction: !1
          }
        });
        var n = new Instafeed({
          get: "tagged",
          tagName: "TDFOpenHouse",
          clientId: "016165602e494672907d96a7256e2529",
          resolution: "low_resolution",
          datetimeFormat: "timedate",
          limit: 1,
          links: !0,
          template: '<div><img src="{{image}}" /><p class="time">Instagrammed on {{created_time}}</p></div>',
          after: function() {
            e("#instafeed img").hover(function() {
              e("img#instagram_icon").fadeToggle("slow", function() {});
              e("#instafeed p").fadeToggle("slow", function() {})
            }, function() {
              e("img#instagram_icon").fadeToggle("slow", function() {});
              e("#instafeed p").fadeToggle("slow", function() {})
            })
          }
        });
        n.run();
        e("#tweet ul").hover(function() {
          e("img#twitter_icon").fadeToggle("slow", function() {});
          e("#tweet p").animate({
            opacity: 1
          }, 500)
        }, function() {
          e("img#twitter_icon").fadeToggle("slow", function() {});
          e("#tweet p").animate({
            opacity: 0
          }, 500)
        })
      })(jQuery)
    }
  },
  windowScrollResize: function(e) {
    (function(t) {
      t(window).scrollTop() >= e ? t("header").addClass("fixed") : t("header").removeClass("fixed")
    })(jQuery)
  },
  "page-template-spot-the-mini-php": {
    init: function() {
      (function(e) {
        if (instagram_hashtag !== "") {
          var t = new Instafeed({
            get: "tagged",
            tagName: instagram_hashtag,
            clientId: "016165602e494672907d96a7256e2529",
            resolution: "low_resolution",
            limit: 24,
            links: !0
          });
          t.run()
        }
        e(".royalSlider").royalSlider({
          controlNavigation: "bullets",
          arrowsNav: !1,
          imageScalePadding: 0,
          autoScaleSlider: !0,
          imageScaleMode: "fill"
        })
      })(jQuery)
    }
  },
  "page-template-colours-of-open-house-php": {
    init: function() {
      (function(e) {
        e(".royalSlider").royalSlider({
          controlNavigation: "bullets",
          arrowsNav: !1,
          imageScalePadding: 0,
          autoScaleSlider: !0,
          imageScaleMode: "fill"
        })
      })(jQuery)
    }
  },
  "page-template-newspaper-php": {
    init: function() {
      (function(e) {
        e(".royalSlider").royalSlider({
          controlNavigation: "bullets",
          arrowsNav: !1,
          imageScalePadding: 0,
          autoScaleSlider: !0,
          imageScaleMode: "fill"
        })
      })(jQuery)
    }
  },
  "page-template-visit-php": {
    init: function() {
      (function(e) {
        (check.isIphone() || check.isAndroid()) && e("a.item").addClass("fancybox-disable");
        var t = e(".royalSlider").royalSlider({
          controlNavigation: "bullets",
          arrowsNav: !0,
          imageScalePadding: 0,
          autoScaleSlider: !0,
          imageScaleMode: "fill"
        }).data("royalSlider");
        e("a.see_details").on("click", function() {
          e(this).parent().parent().children(".map_text_container").slideToggle();
          if (e(this).text() === "See Details") {
            e(this).text("Close");
            google.maps.event.trigger(map1, "resize");
            google.maps.event.trigger(map2, "resize")
          } else e(this).text("See Details")
        });
        e(window).resize(function() {
          e(window).width() > 1080 && e(".map_text_container").css("display", "block")
        });
        e("a.item").fancybox({
          scrolling: "no",
          padding: 0,
          keys: {
            next: {
              39: "left"
            },
            prev: {
              37: "right"
            },
            close: [27]
          },
          tpl: {
            next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span>&#59238;</span></a>',
            prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span>&#59237;</span></a>',
            wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>'
          },
          helpers: {
            overlay: {
              css: {
                background: "rgba(68,75,81,0.85)"
              }
            },
            thumbs: {
              width: 150,
              height: 100
            },
            media: {}
          },
          margin: [60, 100, 100, 100],
          afterShow: function() {
            var t = "<div id='close'><i class='icon-remove'></i></div>";
            e(".fancybox-inner").prepend(t)
          },
          beforeShow: function() {
            e("#close").remove()
          }
        })
      })(jQuery)
    }
  },
  "page-template-suppliers-php": {
    init: function() {
      (function(e) {
        e("#grid").mixitup()
      })(jQuery)
    }
  },
  "single-suppliers": {
    init: function() {
      (function(e) {
        function t() {
          e(".text").css("margin-top", -e(".text").outerHeight() / 2 + "px")
        }(check.isIphone() || check.isAndroid()) && e("a.item").addClass("fancybox-disable");
        e(".supplier_image").imagefill({
          throttle: 1e3 / 60
        });
        t();
        e(window).resize(function() {
          t()
        });
        e("a.item").fancybox({
          scrolling: "no",
          padding: 0,
          keys: {
            next: {
              39: "left"
            },
            prev: {
              37: "right"
            },
            close: [27]
          },
          tpl: {
            next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span>&#59238;</span></a>',
            prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span>&#59237;</span></a>',
            wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>'
          },
          helpers: {
            overlay: {
              css: {
                background: "rgba(68,75,81,0.85)"
              }
            },
            thumbs: {
              width: 150,
              height: 100
            },
            media: {}
          },
          margin: [60, 100, 100, 100],
          afterShow: function() {
            var t = "<div id='price_overlay'>" + e("#grid .item .price").eq(this.index).html() + "</div>",
                n = "<div id='close'><i class='icon-remove'></i></div>";
            e(".fancybox-inner").append(t);
            e(".fancybox-inner").prepend(n)
          },
          beforeShow: function() {
            e("#price_overlay").remove();
            e("#close").remove()
          }
        })
      })(jQuery)
    }
  }
};
UTIL = {
  fire: function(e, t, n) {
    var r = site;
    t = t === undefined ? "init" : t;
    e !== "" && r[e] && typeof r[e][t] == "function" && r[e][t](n)
  },
  loadEvents: function() {
    var e = document.body.id;
    UTIL.fire("common");
    jQuery.each(document.body.className.split(/\s+/), function(t, n) {
      UTIL.fire(n);
      UTIL.fire(n, e)
    });
    UTIL.fire("common", "finalize")
  }
};
jQuery(document).ready(UTIL.loadEvents);
