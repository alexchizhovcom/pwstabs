(function ($) {

   $.fn.pwstabs = function (options) {

      var settings = $.extend({

         // Default settings
         effect: 'scale',   // You can change effects of your tabs container: scale, slideleft, slideright, slidetop, slidedown
         defaultTab: 1    // The tab we want to be opened by default

      }, options);



      // Setting variable for our selector
      var pwsTabsPluginThis = this;
      // Adding class to our selector
      this.addClass('pws_tabs_list');


      // Constructing plugin

      // Put tabs container into another block
      this.wrap('<div class="pws_tabs_container"></div>');



      // Add UL / LI and A control elements to Tabs Container
      this.parent().prepend('<ul></ul>');

      var pwsTabsDataCounter = '1';
      this.find('[data-pws-tab]').each(function () {

         $(this).attr('data-pws-tab-id', pwsTabsDataCounter);

         // Add LIs and A controls
         $(this).parent().parent().find('ul').append('<li><a href="#" data-tab-id="' + $(this).data('pws-tab') + '">' + $(this).data('pws-tab-name') + '</a></li>');

         // Adding class to our selector children (Tabs)
         $(this).addClass('pws_tab_single');

         // Hiding selectors children (Tabs)
         if (settings.effect == 'scale') {
            $(this).addClass('pws_tabs_scale_hide');
         } else if (settings.effect == 'slideleft') {
            $(this).addClass('pws_tabs_slide_left_hide');
         } else if (settings.effect == 'slideright') {
            $(this).addClass('pws_tabs_slide_right_hide');
         } else if (settings.effect == 'slidetop') {
            $(this).addClass('pws_tabs_slide_top_hide');
         } else if (settings.effect == 'slidedown') {
            $(this).addClass('pws_tabs_slide_down_hide');
         } else { // In case something else is in the settings field that is not correct
            $(this).addClass('pws_tabs_scale_hide');
         }

         pwsTabsDataCounter++;

      });

      // Now lets show default Tab
      if (settings.effect == 'scale') {
         this.find('[data-pws-tab-id="' + settings.defaultTab + '"]').addClass('pws_tabs_scale_show');
      } else if (settings.effect == 'slideleft') {
         this.find('[data-pws-tab-id="' + settings.defaultTab + '"]').addClass('pws_tabs_slide_left_show');
      } else if (settings.effect == 'slideright') {
         this.find('[data-pws-tab-id="' + settings.defaultTab + '"]').addClass('pws_tabs_slide_right_show');
      } else if (settings.effect == 'slidetop') {
         this.find('[data-pws-tab-id="' + settings.defaultTab + '"]').addClass('pws_tabs_slide_top_show');
      } else if (settings.effect == 'slidedown') {
         this.find('[data-pws-tab-id="' + settings.defaultTab + '"]').addClass('pws_tabs_slide_down_show');
      } else { // In case something else is in the settings field that is not correct
         this.find('[data-pws-tab-id="' + settings.defaultTab + '"]').addClass('pws_tabs_scale_show');
      }

      // Set container height to default tabs height
      this.height(parseInt(this.find('[data-pws-tab-id="' + settings.defaultTab + '"]').height()));
      // Now lets add active class to default tabs controller
      this.parent().find('ul li a[data-tab-id="' + this.find('[data-pws-tab-id="' + settings.defaultTab + '"]').data('pws-tab') + '"]').addClass('pws_tab_active');


      // First lets find A link and add click function
      this.parent().parent().find('ul li a').click(function (e) {

         e.preventDefault(); // Prevent use of href attribute

         $(this).parent().parent().find('a').removeClass('pws_tab_active');   // Remove active class from all A links
         $(this).addClass('pws_tab_active');                                  // Add active class to current A link

         // Now lets get current href attribute value
         var tabDataIdValue = $(this).data('tab-id');
         var currentTab = $(this).parent().parent().parent().find('div[data-pws-tab="' + tabDataIdValue + '"]');
         var allTabs = $(this).parent().parent().parent().find('[data-pws-tab]');

         var getTabsContainer = $(this).parent().parent().parent().find(pwsTabsPluginThis);



         // Now lets make it cooler, and add some effects to tabs container
         if (settings.effect == 'scale') {
            allTabs.removeClass('pws_tabs_scale_show').addClass('pws_tabs_scale_hide');
            currentTab.addClass('pws_tabs_scale_show');
         } else if (settings.effect == 'slideleft') {
            allTabs.removeClass('pws_tabs_slide_left_show').addClass('pws_tabs_slide_left_hide');
            currentTab.addClass('pws_tabs_slide_left_show');
         } else if (settings.effect == 'slideright') {
            allTabs.removeClass('pws_tabs_slide_right_show').addClass('pws_tabs_slide_right_hide');
            currentTab.addClass('pws_tabs_slide_right_show');
         } else if (settings.effect == 'slidetop') {
            allTabs.removeClass('pws_tabs_slide_top_show').addClass('pws_tabs_slide_top_hide');
            currentTab.addClass('pws_tabs_slide_top_show');
         } else if (settings.effect == 'slidedown') {
            allTabs.removeClass('pws_tabs_slide_down_show').addClass('pws_tabs_slide_down_hide');
            currentTab.addClass('pws_tabs_slide_down_show');
         } else { // In case something else is in the settings field that is not correct
            allTabs.removeClass('pws_tabs_scale_show').addClass('pws_tabs_scale_hide');
            currentTab.addClass('pws_tabs_scale_show');
         }

         // Set main container height to the height of current tab
         pwsTabsPluginThis.height(parseInt(currentTab.height()));


      });

      return this;

   };

} (jQuery));