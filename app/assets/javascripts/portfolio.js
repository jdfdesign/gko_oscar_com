var Portfolio = {
  pageWrapper: $("#page-wrapper"),
  projectPage: $("#project-page"),
  porfolioContainer: $("#projects-container"),
  projectContainer: $("#project-content"),
  nextProjectBtn: $("#next-project"),
  prevProjectBtn: $("#prev-project"),
  closeProjectBtn: $("#close-project"),
  itemTag: 'article',
  currentPage: undefined,
  currentItem: undefined,
  currentItemOffset: undefined, 

  init: function() {
    Portfolio.projectPage.hide();
    
    
    // Enable categories filter
    Portfolio.porfolioContainer.mixitup({
      targetDisplayGrid: 'block' // required to fix bug in Chrome with images height
    });

    // Creates the filter menu for mobile version
    $('#categories-filter ul').each(function() {
      var select = $(document.createElement('select')).insertBefore($(this).parent()).addClass('visible-xs');;
      $('>li', this).each(function() {
        $(document.createElement('option')).appendTo(select).val(this.href).html($(this).html()).addClass($(this).attr('data-filter'));
      });
    });

    // Enable categories filter for select in mobile version
    $('select').on('change', function() {
      Portfolio.porfolioContainer.mixitup('filter', jQuery(this).find('option:selected').attr('class'));
    });
    
    
    $('a[data-remote]').on("ajax:beforeSend", function(evt, xhr, settings) {
      var that, id; 
      console.log("beforeSend")
      that = $(this); 

      // Remove active class on currentItem if any
      if(Portfolio.currentItem){
        Portfolio.currentItem.removeClass('active');
        Portfolio.projectPage.hide();
      }

      // Get the parent (currentItem) of the link
      Portfolio.currentItem = that.closest(Portfolio.itemTag);
  		Portfolio.currentItemOffset = Portfolio.currentItem.offset().top;
			
      // Flag parent (currentItem) as active 
      Portfolio.currentItem.addClass('active');
      
      // Store de current parent (currentItem) for next/prev function
      id = Portfolio.currentItem.attr('id');

      if (Portfolio.currentPage == id) { 

        Portfolio.pageWrapper.fadeOut(750, function(){
    			window.scrollTo(0,0);
    			Portfolio.projectPage.fadeIn(750);
    		});
      } else {
        Portfolio.currentPage = id;
      }

    })
    .on("ajax:success", function(evt, xhr, settings) {
      console.log("Site.success xhr " + eval(xhr))
      var that = $(this), 
          url = that.attr('href');
      
      // Add an item to the history log
      // history.pushState(that.attr('id'), event.target.textContent, url);
               
      if (typeof(_gaq) != "undefined") {
        _gaq.push(['_trackPageview', url]);  
      } else {
        console.log("_gaq disabled for _trackPageview" + url)
      }

      Portfolio.projectContainer.html(eval(xhr));
      
      try {
        FB.XFBML.parse();
      } catch (e) {
        console.log("FB error");
      }

      Portfolio.projectPage.show('300');

    })
    .on('ajax:complete', function(evt, xhr, status) {
      
    })
    .on("ajax:error", function(evt, xhr, status, error) {
      var flash = $.parseJSON(xhr.getResponseHeader('X-Flash-Messages'));
      console.log("Site.error " + flash.error);
    });
    
    /* Function to close project */ 
    Portfolio.closeProjectBtn.on('click', function(){
      jQuery('iframe').attr('src', jQuery('iframe').attr('src')); // required to stop video's on exit project
      Portfolio.projectPage.fadeOut(500, function(){
        Portfolio.pageWrapper.fadeIn(500);
        window.scrollTo(0, Portfolio.currentItemOffset - 75);
  		});
    });
    
    /* Function to next project */ 
    Portfolio.prevProjectBtn.on('click', function(){
      var item = Portfolio.currentItem.prev();
  		if (item == 0) {
  			item = Portfolio.projectPage.find("article").length;
  		}
      item.find("a[data-remote]:first").trigger("click");
  		return false;
    });

    /* Function to next project */ 
    Portfolio.nextProjectBtn.on('click', function(){
      var item = Portfolio.currentItem.next();
  		if (item == Portfolio.projectPage.find("article").length + 1) {
  			item = 1;
  		}
      item.find("a[data-remote]:first").trigger("click");
  		return false;
    });
  }
}
