/**
  * PWS Tabs jQuery Plugin
  * Author: Alex Chizhov
  * Author Website: http://alexchizhov.com/pwstabs
  * GitHub: https://github.com/alexchizhovcom/pwstabs
  * Version: 1.1.0
  * Version from: 15.01.2015
  * Licensed under the MIT license
  */
;(function ($, window, document, undefined) {


   var pluginName = "pwstabs",
    defaults = {
      effect: 'scale',   // You can change effects of your tabs container: scale, slideleft, slideright, slidetop, slidedown
      defaultTab: 1,    // The tab we want to be opened by default
      containerWidth: '100%' // Set custom container width if not set then 100% is used
    };




   function Plugin(element, options) {
      this.element = $(element);
      this.$elem = $(this.element);
      this.settings = $.extend({}, defaults, options);
      this._defaults = defaults;
      this._name = pluginName;

      this.init();
   }


   Plugin.prototype = {

      // Constructing Tabs Plugin
      init: function(){

         var pwsTabs = this.$elem.children('[data-pws-tab]');

         // Adding class to our selector
         this.$elem.addClass('pws_tabs_list');

         // Put tabs container into another block
         this.$elem.wrap('<div class="pws_tabs_container" style="width:' + this.settings.containerWidth + '"></div>');


         // Hiding selectors children (Tabs)
         
         if (this.settings.effect == 'slideleft') {
            $(pwsTabs).addClass('pws_tabs_slide_left_hide');
         } else if (this.settings.effect == 'scale') {
            $(pwsTabs).addClass('pws_tabs_scale_hide');
         } else if (this.settings.effect == 'slideright') {
            $(pwsTabs).addClass('pws_tabs_slide_right_hide');
         } else if (this.settings.effect == 'slidetop') {
            $(pwsTabs).addClass('pws_tabs_slide_top_hide');
         } else if (this.settings.effect == 'slidedown') {
            $(pwsTabs).addClass('pws_tabs_slide_down_hide');
         } else { // In case something else is in the settings field that is not correct
            $(pwsTabs).addClass('pws_tabs_scale_hide');
         }


         // Add UL / LI and A control elements to Tabs Container
         this.$elem.parent().prepend('<ul></ul>');


         var pwsTabsDataCounter = '1';
         this.$elem.children('[data-pws-tab]').each(function(){
            
            // Set Data attributes with tab id number 1+
            $(this).attr('data-pws-tab-id', pwsTabsDataCounter);

            // Add LIs and A controls
            $(this).parent().parent().find('ul').append('<li><a href="#" data-tab-id="' + $(this).data('pws-tab') + '">' + $(this).data('pws-tab-name') + '</a></li>');

            // Adding class to our selector children (Tabs)
            $(this).addClass('pws_tab_single');

            pwsTabsDataCounter++;

         });

         

         // Now lets show default Tab
         if (this.settings.effect == 'slideleft') {
            this.$elem.find('[data-pws-tab-id="' + this.settings.defaultTab + '"]').addClass('pws_tabs_slide_left_show');
         } else if (this.settings.effect == 'scale') {
            this.$elem.find('[data-pws-tab-id="' + this.settings.defaultTab + '"]').addClass('pws_tabs_scale_show');
         } else if (this.settings.effect == 'slideright') {
            this.$elem.find('[data-pws-tab-id="' + this.settings.defaultTab + '"]').addClass('pws_tabs_slide_right_show');
         } else if (this.settings.effect == 'slidetop') {
            this.$elem.find('[data-pws-tab-id="' + this.settings.defaultTab + '"]').addClass('pws_tabs_slide_top_show');
         } else if (this.settings.effect == 'slidedown') {
            this.$elem.find('[data-pws-tab-id="' + this.settings.defaultTab + '"]').addClass('pws_tabs_slide_down_show');
         } else { // In case something else is in the settings field that is not correct
            this.$elem.find('[data-pws-tab-id="' + this.settings.defaultTab + '"]').addClass('pws_tabs_scale_show');
         }

         // Set container height to default tabs height
         this.$elem.height(parseInt(this.$elem.find('[data-pws-tab-id="' + this.settings.defaultTab + '"]').height()));
         // Now lets add active class to default tabs controller
         this.$elem.parent().find('ul li a[data-tab-id="' + this.$elem.find('[data-pws-tab-id="' + this.settings.defaultTab + '"]').data('pws-tab') + '"]').addClass('pws_tab_active');




         


         // First lets find A link and add click function
         this.$elem.parent().find('ul li a').on('click', {pwsOptions : this.settings}, function (e) {

            e.preventDefault(); // Prevent use of href attribute

            var $settings = e.data.pwsOptions;
            var effect = $settings.effect;




            $(this).parent().parent().find('a').removeClass('pws_tab_active');   // Remove active class from all A links
            $(this).addClass('pws_tab_active');                                  // Add active class to current A link

            // Now lets get current href attribute value
            var tabDataIdValue = $(this).data('tab-id');
            var currentTab = $(this).parent().parent().parent().find('div[data-pws-tab="' + tabDataIdValue + '"]');
            var allTabs = $(this).parent().parent().parent().find('[data-pws-tab]');

            var getTabsContainer = $(this).parent().parent().parent().find('.pws_tabs_list');



            // Now lets make it cooler, and add some effects to tabs container
            if (effect == 'slideleft') {
               allTabs.removeClass('pws_tabs_slide_left_show').addClass('pws_tabs_slide_left_hide');
               currentTab.addClass('pws_tabs_slide_left_show');
            } else if (effect == 'scale') {
               allTabs.removeClass('pws_tabs_scale_show').addClass('pws_tabs_scale_hide');
               currentTab.addClass('pws_tabs_scale_show');
            } else if (effect == 'slideright') {
               allTabs.removeClass('pws_tabs_slide_right_show').addClass('pws_tabs_slide_right_hide');
               currentTab.addClass('pws_tabs_slide_right_show');
            } else if (effect == 'slidetop') {
               allTabs.removeClass('pws_tabs_slide_top_show').addClass('pws_tabs_slide_top_hide');
               currentTab.addClass('pws_tabs_slide_top_show');
            } else if (effect == 'slidedown') {
               allTabs.removeClass('pws_tabs_slide_down_show').addClass('pws_tabs_slide_down_hide');
               currentTab.addClass('pws_tabs_slide_down_show');
            } else { // In case something else is in the settings field that is not correct
               allTabs.removeClass('pws_tabs_scale_show').addClass('pws_tabs_scale_hide');
               currentTab.addClass('pws_tabs_scale_show');
            }

            // Set main container height to the height of current tab
            currentTab.parent().height(parseInt(currentTab.height()));


         });















      } // Init function END

   };



   $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            new Plugin( this, options );
        });
    };


})(jQuery, window, document);