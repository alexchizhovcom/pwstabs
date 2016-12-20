/**
 * PWS Tabs jQuery Plugin
 * Author: Alex Chizhov
 * Author Website: http://alexchizhov.com/pwstabs
 * GitHub: https://github.com/alexchizhovcom/pwstabs
 * Version: 1.5.0
 * Version from: 20.12.2016
 * Licensed under the MIT license
 */
;
(function ($, window, document, undefined)
{

    var pluginName = "pwstabs",
            defaults = {
                effect: 'scale', // You can change effects of your tabs container: scale / slideleft / slideright / slidetop / slidedown / none
                defaultTab: 1, // The tab we want to be opened by default
                containerWidth: '100%', // Set custom container width if not set then 100% is used
                tabsPosition: 'horizontal', // Tabs position: horizontal / vertical
                horizontalPosition: 'top', // Tabs horizontal position: top / bottom
                verticalPosition: 'left', // Tabs vertical position: left / right
                responsive: false, // BETA: Make tabs container responsive: true / false - boolean
                theme: '', // Theme name, you can add your own and define it here. This way you dont have to change default CSS. theme: 'name' - string
                rtl: false, // Right to left support: true/ false
                onBeforeFirstInit: function ()
                {},
                onAfterFirstInit: function ()
                {},
                onBeforeInit: function ()
                {},
                onAfterInit: function ()
                {},
                onBeforeChange: function ()
                {},
                onAfterChange: function ()
                {}
            };


    function Plugin(element, options)
    {
        this.element = $(element);
        this.$elem = $(this.element);
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;

        this.settings.onBeforeFirstInit.call(this);

        this.init();

        this.settings.onAfterFirstInit.call(this);
    }


    Plugin.prototype = {
        /**
         * Wrap selector
         * 
         * @since 1.0.0
         */
        wrap: function ()
        {
            // Variable for our selector @1.3.0
            this.selector = this.$elem;

            // Tabs variable @1.4.0
            this.tabs = this.selector.children('[data-pws-tab]');

            // Add class to our selector
            this.selector.addClass('pws_tabs_list');

            // Place selector into container @1.2.0
            this.selector.wrap('<div class="pws_tabs_container"></div>');

            // Container variable @1.3.0
            this.container = this.selector.closest('.pws_tabs_container');
        },
        /**
         * Settings: container width
         * Default: 100%
         * 
         * @since 1.5.0
         */
        setContainerWidth: function ()
        {
            if (this.settings.containerWidth !== '100%')
                this.container.css('width', this.settings.containerWidth);
        },
        /**
         * Settings: Position
         * Default: horizontal
         * 
         * @since 1.0.0
         */
        setContainerPositionClass: function ()
        {
            if (this.settings.tabsPosition == 'vertical') {

                /* 
                 * We need to check if current container is nested, 
                 * if so, add width style equals to parents tab width
                 * @1.4.0
                 */
                if (this.container.closest('.pws_tab_single').length) {
                    var parentWidth = this.container.closest('.pws_tab_single').innerWidth()

                    this.container.css('width', parentWidth);
                }

                this.settings.verticalPosition == 'left'
                        ? this.container.addClass('pws_tabs_vertical pws_tabs_vertical_left')
                        : this.container.addClass('pws_tabs_vertical pws_tabs_vertical_right');

            } else {

                this.settings.horizontalPosition == 'top'
                        ? this.container.addClass('pws_tabs_horizontal pws_tabs_horizontal_top')
                        : this.container.addClass('pws_tabs_horizontal pws_tabs_horizontal_bottom');

            }
        },
        /**
         * Settings to be aplied to container
         * 
         * @since 1.0.0
         */
        setContainerClasses: function ()
        {
            this.setContainerPositionClass();

            // Array of effects @1.3.0
            this.arEffects = [
                'scale',
                'slideleft',
                'slideright',
                'slidetop',
                'slidedown',
                'none'
            ];

            /*
             * Settings: Right to left support
             * Default: false
             */
            if (this.settings.rtl)
                this.container.addClass('pws_tabs_rtl');

            /*
             * Settings: If effect is none
             */
            if (this.settings.effect == 'none')
                this.container.addClass('pws_tabs_noeffect');


            /*
             * Settings: Theme
             * Default: ''
             */
            if (this.settings.theme)
                this.container.addClass(this.settings.theme);

            /*
             * Check if effect exists @1.3.0
             * If effect doesnt exist add scale by default
             */
            if ($.inArray(this.settings.effect, this.arEffects) >= 0)
                this.container.addClass('pws_' + this.settings.effect);
            else
                this.container.addClass('pws_scale');
        },
        /**
         * Set controls
         * 
         * @since 1.0.0
         */
        createControlsContainer: function ()
        {
            if (this.settings.tabsPosition == 'vertical') {

                this.settings.verticalPosition == 'left'
                        ? this.container.prepend('<ul class="pws_tabs_controll"></ul>')
                        : this.container.append('<ul class="pws_tabs_controll"></ul>');

            } else { // Horizontal

                this.settings.horizontalPosition == 'top'
                        ? this.container.prepend('<ul class="pws_tabs_controll"></ul>')
                        : this.container.append('<ul class="pws_tabs_controll"></ul>');

            }

            // Controls variable @1.4.0
            this.controls = this.container.children('.pws_tabs_controll');
        },
        /**
         * Append single tab control
         * 
         * @param {String} id
         * @param {String} title
         * 
         * @since 1.5.0
         */
        setControl: function (id, title)
        {
            this.controls.append('<li><a data-tab-id="' + id + '">' + title + '</a></li>');
        },
        /**
         * Create Tabs controls for each Tab 
         * (div with HTML5 data attribute)
         * 
         * @since 1.0.0
         */
        setControls: function ()
        {
            var $obj = this;

            var counter = 1;
            this.tabs.each(function ()
            {
                // Tab Id @1.3.0
                var id = $(this).data('pws-tab');

                // Tab Title @1.3.0
                var title = $(this).data('pws-tab-name');

                // Add LIs and A controls
                $obj.setControl(id, title);

                // Adding class to our selector children (Tabs)
                $(this).addClass('pws_tab_single');

                counter++;

            });
        },
        /**
         * Set single tab control icon
         * 
         * @param {String} id
         * @param {String} icon
         * 
         * @since 1.5.0
         */
        setIcon: function (id, icon)
        {
            this.controls.find('[data-tab-id="' + id + '"]')
                    .prepend('<i class="fa ' + icon + '"></i>');
        },
        /**
         * Set icons for tabs controls
         * 
         * @since 1.1.4
         */
        setIcons: function ()
        {
            var $obj = this;

            /*
             * Check if a controller has icon data @1.1.4
             */
            this.selector.children('[data-pws-tab-icon]').each(function ()
            {
                var tabId = $(this).attr('data-pws-tab');
                var tabName = $(this).attr('data-pws-tab-name');
                var iconData = $(this).attr('data-pws-tab-icon');

                // If no tab name is set
                if (tabName == '') {
                    $obj.controls.find('[data-tab-id="' + tabId + '"]')
                            .addClass('pws_tab_noname');
                }

                // Add icon to the tab
                $obj.setIcon(tabId, iconData);

            });
        },
        /**
         * Sets width and height for verticaly positioned tabs
         */
        setVerticalSize: function ()
        {
            if (this.settings.tabsPosition == 'vertical') {
                var coefficient = this.container.innerWidth() / 450;
                var letterSize = parseInt(this.controller.css('font-size')) / coefficient; // @1.4.0
                var controllerPaddings = parseInt(this.controller.css('padding-left')) + parseInt(this.controller.css('padding-right')); // @1.4.0.
                var verticalTabsWidth = this.controller.html().length * letterSize + controllerPaddings; // @1.4.0
                var verticalTabsHeight = this.controls.outerHeight();
                var verticalContentWidth = this.container.outerWidth() - verticalTabsWidth;
                var verticalContentHeight = this.selector.outerHeight();

                // Set tabs width
                this.controls.width(verticalTabsWidth);

                // Set content width
                this.selector.outerWidth(verticalContentWidth);

                /*
                 * if selectors height less than controls height
                 * make selector the same height as controls
                 */
                if (verticalContentHeight < verticalTabsHeight)
                    this.selector.css('min-height', verticalTabsHeight);

            }
        },
        /**
         * Set default tab
         */
        setDefaultTab: function ()
        {
            // Show default tab @1.4.0
            this.defaultTab.addClass('pws_show').show();

            /* 
             * Add active class to default tabs controller
             */
            this.controls.find('[data-tab-id="' + this.defaultTab.data('pws-tab') + '"]')
                    .addClass('pws_tab_active');
        },
        /**
         * Make PWS Tabs responsive
         */
        addResponsiveFeature: function ()
        {
            var $obj = this;

            if ($obj.settings.responsive) {

                // Add Responsive class to Tabs container
                $obj.container.addClass('pws_tabs_responsive');

                // Lets count LI's
                var pwsResponsiveControllLiCounter = parseInt($obj.controls.children('li').length);

                var pwsResponsiveControllLiPercentage = 100 / pwsResponsiveControllLiCounter;

                // Get highest LI
                var pwsResponsiveControllLiMaxHeight = Math.max.apply(null, $obj.controllerLi.map(function ()
                {
                    return $(this).height();
                }).get());


                $(window).on('resize load', function (e)
                {
                    var $pluginSettings = $obj.settings;
                    var tabsPosition = $pluginSettings.tabsPosition;
                    var containerWidth = $pluginSettings.containerWidth;

                    // Check window width if less than 60em ( 960px ) then:
                    if ($(window).width() <= 960) {

                        // Remove container width style
                        $obj.container.width('');

                        // Add width to LIs
                        $obj.controllerLi.css('width', pwsResponsiveControllLiPercentage + '%');

                        // Add height to each LIs
                        $obj.controller.each(function ()
                        {
                            $(this).height(pwsResponsiveControllLiMaxHeight);
                        });

                        // If vertical, make it horizontal
                        if (tabsPosition == 'vertical') {
                            $obj.controls.width('');
                            $obj.selector.width('');
                            $obj.selector.css('min-height', '');
                            $obj.selector.height($obj.defaultTab.height());
                        }

                    }
                    if ($(window).width() <= 600) {
                        if ($obj.container.find('.pws_responsive_small_menu').length < 1) {
                            // Add new button to trigger tabs menu
                            $('<div class="pws_responsive_small_menu"><a data-visible="0"><i class="fa fa-bars"></i></a></div>').insertBefore($obj.controls);
                        }

                        // Add new class to UL controll
                        $obj.controls.addClass('pws_tabs_menu_popup');

                        $obj.controller.height('');
                        $obj.controllerLi.width('');

                        // Popup tabs menu trigger
                        $obj.container.unbind().on('click', '.pws_responsive_small_menu a', function (e)
                        {
                            e.preventDefault();

                            $obj.container.find('ul.pws_tabs_menu_popup').toggleClass('show');
                        });

                        // Hide menu on tab pick
                        $obj.container.find('ul.pws_tabs_menu_popup li a').on('click', function (e)
                        {
                            e.preventDefault();
                            $(this).closest('ul.pws_tabs_menu_popup').removeClass('show');
                        });

                    } else if ($(window).width() > 960) {
                        $obj.container.css('width', containerWidth);
                        $obj.controllerLi.width('');
                        $obj.controller.height('');
                        $obj.container.find('.pws_responsive_small_menu').remove();
                        $obj.controls.removeClass('pws_tabs_menu_popup');
                        $obj.controls.show();
                    } else if ($(window).width() > 600) {
                        // Remove 600px screen menu
                        $obj.container.find('.pws_responsive_small_menu').remove();
                        $obj.controls.removeClass('pws_tabs_menu_popup');
                        $obj.controls.show();
                        $obj.controller.on('click', function (e)
                        {
                            e.preventDefault();
                            $(this).parent().parent().show();
                        });
                    }
                });

            }
        },
        /**
         * Constructing Tabs Plugin
         * 
         * @since 1.0.0
         */
        init: function ()
        {
            this.settings.onBeforeInit.call(this);

            var $obj = this;

            this.wrap();

            this.setContainerWidth();

            this.setContainerClasses();

            this.createControlsContainer();

            this.setControls();

            // Hide tabs content @1.4.0
            this.tabs.addClass('pws_hide').hide();

            // Controller variable @1.3.0
            this.controller = this.controls.find('a');

            // Controller li variable @1.3.0
            this.controllerLi = this.controls.find('li');

            /**
             * Set Default tab by index
             * 
             * @since 1.5.0
             */
            this.defaultTab = this.tabs.eq(this.settings.defaultTab - 1);

            this.setIcons();

            this.setVerticalSize();

            this.setDefaultTab();

            /*
             * Controller click function
             */
            this.controls.on('click', 'a', function (e)
            {
                e.preventDefault();

                $obj.settings.onBeforeChange.call($obj);

                // Remove active class from all controllers
                $obj.controller.removeClass('pws_tab_active');
                // Add active class to current controller
                $(this).addClass('pws_tab_active');

                var tabId = $(this).data('tab-id');
                var currentTab = $obj.selector.children('[data-pws-tab="' + tabId + '"]');

                // Add an effect to a tab on click @1.4.0
                $obj.tabs.removeClass('pws_show');

                setTimeout(function ()
                {
                    $obj.tabs.hide();
                    currentTab.show();
                }, 400);

                setTimeout(function ()
                {
                    currentTab.addClass('pws_show');
                    $obj.settings.onAfterChange.call($obj);
                }, 450);


            });

            this.addResponsiveFeature();

            this.settings.onAfterInit.call(this);

        },
        /**
         * Set an option dynamically after plugin has been initialized
         * 
         * @param {String} option
         * @param {String} value
         * 
         * @since 1.5.0
         */
        setOption: function (option, value)
        {
            this.settings[option] = value;
        },
        /**
         * Destroys the plugin
         * 
         * @since 1.5.0
         */
        destroy: function ()
        {
            this.controls.remove();

            this.selector.unwrap().removeClass('pws_tabs_list');

            this.tabs.show()
                    .removeClass('pws_tab_single pws_hide pws_show')
                    .removeAttr('style');
        },
        /**
         * Rebuild the plugin
         * 
         * @since 1.5.0
         */
        rebuild: function ()
        {
            this.destroy();
            this.init();
        },
        /**
         * Dynamically create tab
         * 
         * @param {Array} args
         * 
         * @since 1.5.0
         */
        addTab: function (args)
        {
            var defaultArgs = {
                id: '',
                name: '',
                icon: '',
                content: ''
            };

            var params = $.extend({}, defaultArgs, args);

            // Add tab
            var tab = $('<div />').appendTo(this.selector)
                    .addClass('pws_tab_single pws_hide')
                    .attr('data-pws-tab', params.id)
                    .attr('data-pws-tab-name', params.name)
                    .hide()
                    .html(params.content);

            // Add tab control
            this.setControl(params.id, params.name);

            // If icon parameter is set, add icon to the tab control
            if (params.icon) {
                this.setIcon(params.id, params.icon);
                tab.attr('data-pws-tab-icon', params.icon);
            }

            // Update data
            this.controller = this.controls.find('a');
            this.tabs = this.selector.children('[data-pws-tab]');
        },
        /**
         * Dynamically remove a tab
         * @param {Number} index
         * 
         * @since 1.5.0
         */
        removeTab: function (index)
        {
            var tab = this.tabs.eq(index - 1);

            // Check if the tab being removed is active
            if (tab.hasClass('pws_show')) {
                this.setOption('defaultTab', 1);
            }

            // Remove the tab
            tab.remove();

            // Remove the control
            this.controller.eq(index - 1).remove();

            this.rebuild();
        }

    };

    $.fn[pluginName] = function (options)
    {

        var args = $.makeArray(arguments);
        var selector = args.slice(1);

        return this.each(function ()
        {
            var instance = $.data(this, pluginName);

            if (instance) {

                // Setting a new option
                if (instance.settings[options]) {
                    var optionValue = selector.toString();
                    instance.setOption(options, optionValue);
                    instance.rebuild();
                }

                // Trigger addTab method
                if (options === 'addTab') {
                    instance.addTab(selector[0]);
                }

                // Trigger removeTab method
                if (options === 'removeTab') {
                    instance.removeTab(selector[0]);
                }

                // Trigger destroy method
                if (options === 'destroy') {
                    instance.destroy();
                }

                // Trigger rebuild method
                if (options === 'rebuild') {
                    instance.rebuild();
                }

            } else {

                var plugin = new Plugin(this, options);

                $.data(this, pluginName, plugin);

                return plugin;

            }

        });
    };

})(jQuery, window, document);