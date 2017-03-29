;(function($) {
    $(document).ready(function() {
    
        // create GLOBAL JSPACK Object
        var JSPACK = {
            v: {},
            globals: this.v,
            isset: function(v_var) {
                if (typeof(v_var) == 'number') {
                    if (isNaN(v_var)) {
                        return false;
                    }
                }
                if (typeof(v_var) == 'undefined' || v_var === null) {
                    return false;
                }
                return true;
            },
            rand: function(min, max) { //JSPACK.rand(0,3);
               return Math.floor(min + Math.random() * (max + 1 - min));
            },
            tabs: function(tabs_selector, tab_contents_selector) {
                $(tab_contents_selector + ' .tab').hide();
                $(tab_contents_selector + ' .tab:first').addClass('tab_active').show();

                $(tabs_selector + ':first').addClass('active');

                $(tabs_selector).unbind('click');
                $(tabs_selector).bind('click', function(e) {
                    $(tabs_selector).removeClass('active');
                    $(this).addClass('active');
                    //console.log(tabs_selector);
                    var go_tab = $(this).attr('data-tab');
                    $(tab_contents_selector + ' .tab').removeClass('tab_active').hide();
                    $(tab_contents_selector + ' #' + go_tab).addClass('tab_active').show();
                    //console.log(tab_contents_selector +'#'+go_tab);
                    e.preventDefault();
                    return false;
                });
            },
            video_tabs: function(tabs_selector, tab_contents_selector) {
                $(tab_contents_selector + ' .tab').hide();
                $(tab_contents_selector + ' .tab:first').addClass('tab_active').show();

                $(tabs_selector + ':first').addClass('active');

                $(tabs_selector).unbind('click');
                $(tabs_selector).bind('click', function(e) {
                    $(tabs_selector).removeClass('active');
                    $(this).addClass('active');
                    //console.log(tabs_selector);
                    var go_tab = $(this).attr('data-tab');
                    $(tab_contents_selector + ' .tab').removeClass('tab_active').hide();
                    $(tab_contents_selector + ' #' + go_tab).addClass('tab_active').show();
                    //console.log(tab_contents_selector +'#'+go_tab);
                    e.preventDefault();
                    return false;
                });
            },
            open_tab: function(tabs_selector, tab_contents_selector, open_this_id) {
                $( tabs_selector + ' a').removeClass('active');
                $( tabs_selector + ' a[data-tab="'+ open_this_id +'"]').addClass('active');

                $( tab_contents_selector + ' .tab' ).removeClass('tab_active').hide();
                $( tab_contents_selector + ' #'+ open_this_id ).addClass('tab_active').show();
            },
            iframe_resize: function(iframe_selector) {
                var v = {};
                v.ww = $(window).width();
                v.wh = $(window).height();

                v.parent_w = $(iframe_selector).parent().width();
                v.parent_h = $(iframe_selector).parent().height();

                v.frame_w = parseInt($(iframe_selector).attr('width'), 10);
                v.frame_h = parseInt($(iframe_selector).attr('height'), 10);

                v.frame_ratio = v.frame_w / v.frame_h;
                v.frame_ratio_h = v.frame_h / v.frame_w;

                v.new_sum_w = v.parent_w;
                v.new_sum_h = Math.floor(v.new_sum_w * v.frame_ratio_h);
                //console.log( v.new_sum_h );

                $(iframe_selector).attr('width', v.new_sum_w);
                $(iframe_selector).attr('height', v.new_sum_h);
            },
            btn_up_active: function(btn_selector, content_selector) {
                $(btn_selector).magnificPopup({
                    closeOnBgClick: true,
                    removalDelay: 500,
                    mainClass: 'mfp-zoom-in',
                    preloader: false,
                    midClick: true,
                    callbacks: {
                        //
                    },
                    items: {
                        src: content_selector,
                        type: 'inline'
                    }
                });
            },
            jmua: function(jmua_selector, jmua_level, jmua_class, is_index) {
                var jmua_url = location.href;
                var jmua_link = jmua_url.split('/')[jmua_level];

                if (jmua_link !== 0 || jmua_link !== '') {
                    $.each($(jmua_selector + " a[href*='" + jmua_link + "']"), function() {
                        $(this).addClass(jmua_class);
                    });
                    //console.log( '1'+jmua_link+'2' );
                } else {
                    $(jmua_selector + ' a:first').addClass(jmua_class);
                    //console.log('no');
                }

                if (is_index === true) {
                    if (jmua_link == "index.php" | jmua_link == "index.php#") {
                        $(jmua_selector + ' a:first').addClass(jmua_class);
                    }
                }
            },
            resize_img_w: function(_width, _height, _new_w, out) {
                out = Math.floor((_height / _width) * _new_w);
                return out; //return new height
            },
            resize_img_h: function(_width, _height, _new_h, out) {
                out = Math.floor((_width / _height) * _new_h);
                return out; //return new width
            },
            resize_img: function(width, height, img_width, img_height, out) {
                out = {};
                out.width = width;
                out.height = JSPACK.resize_img_w(img_width, img_height, width);

                if (out.height < height) {
                    out.width = JSPACK.resize_img_h(img_width, img_height, height);
                    out.height = height;
                }
                return out; //return new width and height
            },
            one_height: function(s1, s2, v) {
                v = {};
                v.s1h = parseInt($(s1).height(), 10);
                v.s2h = parseInt($(s2).height(), 10);
                if (v.s1h > v.s2h) {
                    $(s2).css('height', v.s1h + 'px');
                } else {
                    $(s1).css('height', v.s2h + 'px');
                }
            },
            one_height_left: function(s1, s2, v) {
                v = {};
                v.s1h = parseInt($(s1).height(), 10);
                v.s2h = parseInt($(s2).height(), 10);
                $(s2).css('height', v.s1h + 'px');
            },
            SmartResize: function(func_name) {
                $(window).bind('resize', function(e) {
                    window.resizeEvt;
                    $(window).resize(function() {
                        clearTimeout(window.resizeEvt);
                        window.resizeEvt = setTimeout(function() {
                            JSPACK.SmartResize_start();
                        }, 250);
                    });
                });
            },
            get_handle_position: function(selector, type, input_size, v) {
                v = {};
                v.this_value = $(selector).slider("value");
                v.slider_handle_position = $(selector + " .ui-slider-handle").position();
                if (type == "v") {
                    v.handle_position = v.slider_handle_position.top;
                    //v.slider_width = parseInt( $( selector ).height(), 10);
                    v.handle_height = parseInt($(selector + " .ui-slider-handle").height(), 10);
                    v.position = (v.handle_position - (input_size / 2) + (v.handle_height));
                } else {
                    v.handle_position = v.slider_handle_position.left;
                    //v.slider_width = parseInt( $( selector ).width(), 10);
                    v.handle_width = parseInt($(selector + " .ui-slider-handle").width(), 10);
                    v.position = (v.handle_position - (input_size / 2) + (v.handle_width));
                }
                return v;
            },
            is_url: function(v) {
                this.isUrl_regex = /(\/\/|\/\/:)/i;
                if (this.isUrl_regex.test(v)) {
                    return true; //console.log('this URL true');
                }
                return false; //console.log('this not URL true');
            },
            test_str: function(v, reg) { //JSPACK.test_str('str', /(\/\/|\/\/:)/i);
                if (reg.test(v)) {
                    return true;
                }
                return false;
            },
            get_arr: function(selector, attr, v_name) { //JSPACK.get_arr('.btn_sorting a', 'data-sorting', cat_kuhny_sort_arr );
                JSPACK.v[v_name] = [];
                $(selector).each(function(index, el) {
                    JSPACK.v[v_name][index] = $(this).attr(attr);
                });

                if (JSPACK.isset(JSPACK.v[v_name])) {
                    return JSPACK.v[v_name];
                } else {
                    return false;
                }
            },
            get_hash_number: function(v) {
                var v_match = v.match(/news-(\d+)/i);
                if (v_match && v_match.length > 1) {
                    return v_match[1];
                }
                return false;
            },
            find_data: function(str, data_arr) { //JSPACK.find_data('string', ['string', 'str', 1] );
                this.out = false;
                if (JSPACK.isset(data_arr)) {
                    for (var i = 0; i < data_arr.length; i++) {
                        if (data_arr[i] == str) {
                            this.out = data_arr[i];
                        }
                    }
                }
                return this.out;
            },
            hash_history: function(v, reg) { //JSPACK.hash_history();
                this.hash = window.location.hash;

                if (JSPACK.isset(this.hash)) {
                    this.hash_str = this.hash.replace('#', '');
                    JSPACK.v.hash = this.hash_str;
                    return this.hash_str;
                } else {
                    return false;
                }
            },
            n: function(num, plus, num2) {
                if (num < 1 && num2 < 1) {
                    num = num * 10;
                    num2 = num2 * 10;
                }
                var result = '' + num + plus + num2;
                rerult = eval(result);
                return result / 10;
            },
            set_photoswipe: function(selector, v){ //JSPACK.set_photoswipe('.content img');
              v = {};
              $( selector ).each(function(index, el) {
                v.w = $(this).attr('width');
                v.h = $(this).attr('height');
                v.src = $(this).attr('src');
                v.ok = v.w + 'x' + v.h;

                if( $(this).parent('a') ){
                  $(this).parent('a').attr('data-sizes', v.ok);
                } else {
                  $(this).wrap('<a data-sizes="'+ v.ok +'" href="'+ v.src +'"></a>');
                }
              });
            }
        };

        window.JSPACK = JSPACK;
        //JSPACK now global window object

        //############TEST##############
        //var go_log = JSPACK.find_data('string', ['string', 'str', 1] );
        //console.log( go_log ); //string
        //var this_hash = JSPACK.hash_history();
        //console.log( this_hash );

        //var isotope_sort_arr = JSPACK.get_arr('.katalog_isotope_filter a', 'data-filter-class', 'cat_sort_arr' );
        //console.log( go_log ); //#
        //console.log( JSPACK.v.cat_sort_arr );

        //var this_filter_class = JSPACK.find_data( this_hash, isotope_sort_arr );
        //console.log( go_log ); //string
        //filter_isotope( this_filter_class );

        //############TEST##############

        JSPACK.SmartResize();
        JSPACK.SmartResize_start = function() {
            console.log('log_ok');
        };

        /* SmartResize function */
        $(window).bind('resize', function(e) {
            window.resizeEvt;
            $(window).resize(function() {
                clearTimeout(window.resizeEvt);
                window.resizeEvt = setTimeout(function() {
                    SmartResize();
                }, 250);
            });
        });

        function SmartResize() {

        }

        //start all
        SmartResize();

    });
})(jQuery);
