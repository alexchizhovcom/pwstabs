/**
  * PWS Tabs jQuery Plugin
  * Author: Alex Chizhov
  * Author Website: http://alexchizhov.com/pwstabs
  * GitHub: https://github.com/alexchizhovcom/pwstabs
  * Version: 1.1.3
  * Version from: 18.01.2015
  * Licensed under the MIT license
  */
;(function ($, window, document, undefined) {


   var pluginName = "pwstabs",
    defaults = {
      effect: 'scale',              // You can change effects of your tabs container: scale, slideleft, slideright, slidetop, slidedown
      defaultTab: 1,                // The tab we want to be opened by default
      containerWidth: '100%',       // Set custom container width if not set then 100% is used
      tabsPosition: 'horizontal',   // Tabs position: horizontal / vertical
      horizontalPosition: 'top',    // Tabs horizontal position: top / bottom
      verticalPosition: 'left',     // Tabs vertical position: left / right
      rtl: false                    // Right to left support: true/ false
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

         // Check if RTL support is true or false
         var pwsRtlClass = '';
         if( this.settings.rtl == true ){
            pwsRtlClass = ' pws_tabs_rtl';
         }


         if ( this.settings.tabsPosition == 'vertical' ){ // Vertical
            if ( this.settings.verticalPosition == 'left' ){ // Vertical Left
               positionClass = ' pws_tabs_vertical pws_tabs_vertical_left';
            } else { // Vertical Right
               positionClass = ' pws_tabs_vertical pws_tabs_vertical_right';
            }
         } else { // Horizontal
            if ( this.settings.horizontalPosition == 'top' ){ // Horizontal Top
               positionClass = ' pws_tabs_horizontal pws_tabs_horizontal_top';               
            } else { // Horizontal Bottom
               positionClass = ' pws_tabs_horizontal pws_tabs_horizontal_bottom';
            }
         }



         // Put tabs container into another block
         this.$elem.wrap('<div class="pws_tabs_container'+pwsRtlClass+positionClass+'" style="width:' + this.settings.containerWidth + '"></div>');


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

         // Check => Horizontal / Vertical position @since 1.1.3
         if ( this.settings.tabsPosition == 'vertical' ){ // Vertical
            if ( this.settings.verticalPosition == 'left' ){ // Vertical Left
               this.$elem.parent().prepend('<ul class="pws_tabs_controll"></ul>');
            } else { // Vertical Right
               this.$elem.parent().append('<ul class="pws_tabs_controll"></ul>');
            }
         } else { // Horizontal
            if ( this.settings.horizontalPosition == 'top' ){ // Horizontal Top
               this.$elem.parent().prepend('<ul class="pws_tabs_controll"></ul>');
            } else { // Horizontal Bottom
               this.$elem.parent().append('<ul class="pws_tabs_controll"></ul>');
            }
         }



         var pwsTabsDataCounter = '1';
         this.$elem.children('[data-pws-tab]').each(function(){
            
            // Set Data attributes with tab id number 1+
            $(this).attr('data-pws-tab-id', pwsTabsDataCounter);

            // Add LIs and A controls
            $(this).parent().parent().find('ul.pws_tabs_controll').append('<li><a href="#" data-tab-id="' + $(this).data('pws-tab') + '">' + $(this).data('pws-tab-name') + '</a></li>');

            // Adding class to our selector children (Tabs)
            $(this).addClass('pws_tab_single');

            pwsTabsDataCounter++;

         });



         if ( this.settings.tabsPosition == 'vertical' ){ // Vertical position
            /**
             * #############################################
             * Tabs and content width for vertical position
             * #############################################
             */
            // Set tabs width
            var verticalTabsWidth = parseInt(this.$elem.parent().find('ul.pws_tabs_controll li a').outerWidth()) + 1;
            this.$elem.parent().find('ul.pws_tabs_controll').width(verticalTabsWidth);

            // Set content width
            var verticalContentWidth = parseInt(this.$elem.parent().outerWidth()) - verticalTabsWidth;
            this.$elem.outerWidth(verticalContentWidth);

            /**
             * #############################################
             * Tabs height should not be less than content
             * #############################################
             */
            var verticalTabsHeight = parseInt(this.$elem.parent().find('ul.pws_tabs_controll').outerHeight());
            var verticalContentHeight = parseInt(this.$elem.outerHeight());

            // Check if content height less than tabs height
            if( verticalContentHeight < verticalTabsHeight ){
               this.$elem.css('min-height',verticalTabsHeight);
            }
         }




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
         // Check if horizontal @since 1.1.2
         if ( this.settings.tabsPosition == 'horizontal' ){ // Vertical
            this.$elem.height(parseInt(this.$elem.find('[data-pws-tab-id="' + this.settings.defaultTab + '"]').height()));
         } else {
            if( verticalContentHeight < verticalTabsHeight ){ // Check if contents height less than tabs
               this.$elem.css('min-height',verticalTabsHeight);
            }
         }


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