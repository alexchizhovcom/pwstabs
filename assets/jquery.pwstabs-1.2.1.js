/**
  * PWS Tabs jQuery Plugin
  * Author: Alex Chizhov
  * Author Website: http://alexchizhov.com/pwstabs
  * GitHub: https://github.com/alexchizhovcom/pwstabs
  * Version: 1.2.1
  * Version from: 23.01.2015
  * Licensed under the MIT license
  */
;(function ($, window, document, undefined) {

   var pluginName = "pwstabs",
    defaults = {
      effect: 'scale',              // You can change effects of your tabs container: scale / slideleft / slideright / slidetop / slidedown / none
      defaultTab: 1,                // The tab we want to be opened by default
      containerWidth: '100%',       // Set custom container width if not set then 100% is used
      tabsPosition: 'horizontal',   // Tabs position: horizontal / vertical
      horizontalPosition: 'top',    // Tabs horizontal position: top / bottom
      verticalPosition: 'left',     // Tabs vertical position: left / right
      responsive: false,             // BETA: Make tabs container responsive: true / false - boolean
      theme: '',                    // Theme name, you can add your own and define it here. This way you dont have to change default CSS. theme: 'name' - string
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

         // Add class to our selector
         this.$elem.addClass('pws_tabs_list');

         // Place selector into container @1.2.0
         this.$elem.wrap('<div class="pws_tabs_container"></div>');


         /**
         * ##########################################################################################
         * Check options and add Classes to container if needed. Restructured since @1.2.0
         * ##########################################################################################
         */

         // Settings => containerWidth : value
         if( this.settings.containerWidth !== '100%' ){
            this.$elem.parent().css( 'width', this.settings.containerWidth );
         }


         // Settings => tabsPosition: vertical
         if ( this.settings.tabsPosition == 'vertical' ){

            // Settings => verticalPosition: left
            if ( this.settings.verticalPosition == 'left' ){
               this.$elem.parent().addClass('pws_tabs_vertical pws_tabs_vertical_left');

            // Settings => verticalPosition: right
            } else {
               this.$elem.parent().addClass('pws_tabs_vertical pws_tabs_vertical_right');
            }

         // Settings => tabsPosition: horizontal
         } else {

            // Settings => horizontalPosition: top
            if ( this.settings.horizontalPosition == 'top' ){ // Horizontal Top
               this.$elem.parent().addClass('pws_tabs_horizontal pws_tabs_horizontal_top');

            // Settings => horizontalPosition: bottom
            } else {
               this.$elem.parent().addClass('pws_tabs_horizontal pws_tabs_horizontal_bottom');
            }
         }

         // Settings => rtl : true
         if( this.settings.rtl == true ){
            this.$elem.parent().addClass('pws_tabs_rtl');
         }

         // Settings => effect : none
         if( this.settings.effect == 'none' ){
            this.$elem.parent().addClass('pws_tabs_noeffect');
         }

         // Settings => theme : string
         if ( this.settings.theme !== '' ){
            this.$elem.parent().addClass( this.settings.theme );
         }


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
         } else if (this.settings.effect == 'none') {
            $(pwsTabs).addClass('pws_tabs_none_hide');
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


         /**
         * #####################################################################
         * Create Tabs controlls for each Tab (div with HTML5 data attribute)
         * #####################################################################
         */
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


         if ( this.settings.tabsPosition == 'vertical' ){ // Vertical
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


         /**
         * #############################################
         * Show default Tab
         * #############################################
         */
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
         } else if (this.settings.effect == 'none') {
            this.$elem.find('[data-pws-tab-id="' + this.settings.defaultTab + '"]').addClass('pws_tabs_none_show');
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

         /**
         * #############################################
         * Add active class to default tabs controller
         * #############################################
         */
         this.$elem.parent().find('ul li a[data-tab-id="' + this.$elem.find('[data-pws-tab-id="' + this.settings.defaultTab + '"]').data('pws-tab') + '"]').addClass('pws_tab_active');
         
         /**
         * #############################################
         * Check if a Tab controll has icon data @1.1.4
         * #############################################
         */
         this.$elem.children('[data-pws-tab-icon]').each(function(){

            var tabId = $(this).attr('data-pws-tab');
            var tabName = $(this).attr('data-pws-tab-name');
            var iconData = $(this).attr('data-pws-tab-icon');


            if( tabName == '' ){
               $(this).parent().parent().find('ul.pws_tabs_controll li a[data-tab-id="'+tabId+'"]').addClass('pws_tab_noname');
            }

            $(this).parent().parent().find('ul.pws_tabs_controll li a[data-tab-id="'+tabId+'"]').prepend('<i class="fa '+iconData+'"></i>');

         });

         // A controll click function
         this.$elem.parent().find('ul li a').on('click', {pwsOptions : this.settings}, function (e) {

            e.preventDefault(); // Prevent use of href attribute

            var $settings = e.data.pwsOptions;
            var effect = $settings.effect;


            $(this).parent().parent().find('a').removeClass('pws_tab_active');   // Remove active class from all A links
            $(this).addClass('pws_tab_active');                                  // Add active class to current A link

            var pwsParent = $(this).parent().parent().parent(); // @1.2.0

            // Now lets get current href attribute value
            var tabDataIdValue = $(this).data('tab-id');
            var currentTab = pwsParent.find('div[data-pws-tab="' + tabDataIdValue + '"]');
            var allTabs = pwsParent.find('[data-pws-tab]');

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
            } else if (effect == 'none') {
               allTabs.removeClass('pws_tabs_none_show').addClass('pws_tabs_none_hide');
               currentTab.addClass('pws_tabs_none_show');
            } else { // In case something else is in the settings field that is not correct
               allTabs.removeClass('pws_tabs_scale_show').addClass('pws_tabs_scale_hide');
               currentTab.addClass('pws_tabs_scale_show');
            }

            // Set main container height to the height of current tab
            currentTab.parent().height(parseInt(currentTab.height()));

         });




         /**
         * #######################################################################################################################################
         * CODE TO MAKE TABS RESPONSIVE @1.2.0
         * #######################################################################################################################################
         */

         if( this.settings.responsive == true ){

            // Add Responsive class to Tabs container
            this.$elem.parent().addClass('pws_tabs_responsive');

            // Compare UL Controll width and content width
            var pwsResponsiveControllsUl = this.$elem.parent().find('ul.pws_tabs_controll');
               var pwsResponsiveControllLi = pwsResponsiveControllsUl.children('li');
                  var pwsResponsiveControllA = pwsResponsiveControllLi.children('a');

            var pwsResponsiveContentBlock = this.$elem;


            var pwsResponsiveControllsUlWidth = parseInt( pwsResponsiveControllsUl.outerWidth() );
            var pwsResponsiveContentBlockWidth = parseInt( pwsResponsiveContentBlock.outerWidth() );


            // Lets count LI's
            var pwsResponsiveControllLiCounter = parseInt( pwsResponsiveControllsUl.children('li').length );

            var pwsResponsiveControllLiPercentage = 100 / pwsResponsiveControllLiCounter;

            // Get highest LI
            var pwsResponsiveControllLiMaxHeight = Math.max.apply(null, pwsResponsiveControllLi.map(function(){
               return $(this).height();
            }).get());


            $(window).on('resize load', {pluginSettings : this.settings },  function(e){

               var $pluginSettings = e.data.pluginSettings;
               var tabsPosition = $pluginSettings.tabsPosition;
               var defaultTab = $pluginSettings.defaultTab;
               var containerWidth = $pluginSettings.containerWidth;

               // Check window width if less than 60em ( 960px ) then:
               if( $(window).width() <= 960 ){
            
                  // Remove container width style
                  pwsResponsiveContentBlock.parent().width('');

                  // Add width to LIs
                  pwsResponsiveControllLi.css( 'width', pwsResponsiveControllLiPercentage +'%' );

                  // Add height to each LIs
                  $(pwsResponsiveControllA).each(function(){
                     $(this).height( pwsResponsiveControllLiMaxHeight );
                  });

                  // If vertical, make it horizontal
                  if( tabsPosition == 'vertical' ){
                     pwsResponsiveControllsUl.width('');
                     pwsResponsiveContentBlock.width('');
                     pwsResponsiveContentBlock.css('min-height','');
                     pwsResponsiveContentBlock.height(parseInt(pwsResponsiveContentBlock.find('[data-pws-tab-id="' + defaultTab + '"]').height()));
                  }

               } if ( $(window).width() <= 600 ){
                  if( pwsResponsiveContentBlock.parent().find('.pws_responsive_small_menu').length < 1 ){
                     // Add new button to trigger tabs menu
                     $('<div class="pws_responsive_small_menu"><a href="#" data-visible="0"><i class="fa fa-bars"></i></a></div>').insertBefore(pwsResponsiveControllsUl);
                  }
               
                  // Add new class to UL controll
                  pwsResponsiveControllsUl.addClass('pws_tabs_menu_popup');
               
                  pwsResponsiveControllA.height('');
                  pwsResponsiveControllLi.width('');
               
                  // Hide popup menu
                  pwsResponsiveContentBlock.parent().find('ul.pws_tabs_menu_popup').hide();

                  // Popup tabs menu trigger
                  pwsResponsiveContentBlock.parent().find('.pws_responsive_small_menu a').click(function(e){
                     e.preventDefault();
                     // We will add data atribute and check it 0/1
                     if( $(this).attr('data-visible') == '0' ){
                        $(this).parent().parent().find('ul.pws_tabs_menu_popup').show();
                        $(this).attr('data-visible','1');
                     } else {
                        $(this).parent().parent().find('ul.pws_tabs_menu_popup').hide();
                        $(this).attr('data-visible','0');
                     }
                  });

                  // Hide menu on tab pick
                  pwsResponsiveContentBlock.parent().find('ul.pws_tabs_menu_popup li a').on('click', function(e){
                     e.preventDefault();
                     $(this).parent().parent().hide();
                     pwsResponsiveContentBlock.parent().find('.pws_responsive_small_menu a').attr('data-visible','0');
                  });

               } else if( $(window).width() > 960 ) {
                  pwsResponsiveContentBlock.parent().css( 'width', containerWidth );
                  pwsResponsiveControllLi.width('');
                  pwsResponsiveControllA.height('');
                  pwsResponsiveContentBlock.parent().find('.pws_responsive_small_menu').remove();
                  pwsResponsiveControllsUl.removeClass('pws_tabs_menu_popup');
                  pwsResponsiveControllsUl.show();
               } else if( $(window).width() > 600 ) {
                  // Remove 600px screen menu
                  pwsResponsiveContentBlock.parent().find('.pws_responsive_small_menu').remove();
                  pwsResponsiveControllsUl.removeClass('pws_tabs_menu_popup');
                  pwsResponsiveControllsUl.show();
                  $(pwsResponsiveControllA).on('click', function(e){
                     e.preventDefault();
                     $(this).parent().parent().show();
                  });
               }
            });

         } // EOF: IF RESPONSIVE


      } // Init function END

   };



   $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            new Plugin( this, options );
        });
    };


})(jQuery, window, document);