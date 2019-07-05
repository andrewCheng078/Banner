//需求 

// 設定一開始是否為開或合
//     openAtStart: true, // [boolean] true | false
//     // 設定啟動後是否要自動開或合，若設為false，就不要自勳開合；若為true是馬上自動開合；若為數字是幾毫秒之後開合
//     autoToggle: true, // [boolean|number] true | false | 3000
//     // 設定收合展開按鈕
//     button: {
//         closeText: '收合', // [string]
//         openText: '展開', // [string]
//         class: 'btn' // [string]
//     },
//     // 設定模組在各狀態時的class
//     class: {
//         closed: 'closed', // [string]
//             closing: 'closing', // [string]
//             opened: 'opened', // [string]
//             opening: 'opening' // [string]
//     },
//     // 是否要有transition效果
//     transition: true,
//     // 當有transition時，要執行的callback function
//     whenTransition: function () {
//         console.log('whenTransition');
//     }

(function($) {
    'use strict';
        var ModuleName = 'lbx_lnop';
    
        var Module = function ( ele, options ) {
            this.ele = ele;
            this.$ele = $(ele);
            this.option = options;
        };
    
        Module.DEFAULTS = {
            openAtStart:true,
            autoToggle:false,//open === true toggle will
            transition: true,
            whenClickCallback: function() {
                console.log('whenClickCallback,DEFAULTS');
            }
        };

        Module.prototype.init = function ( opts ) {
            var jQuery = this.$ele;
            $('.banner').append(` <button class="wrap_btn"> 收合</button>`)
            $('.wrap_btn').click(function () {
                $('.banner').lbx_lnop('toggle');
            })
            if(opts.transition){ jQuery.addClass('transition')};
            if(opts.openAtStart){this.open(opts.openAtStart)}else{this.close(opts.openAtStart)};
            if(opts.autoToggle){this.toggle(opts.autoToggle)};
            // $('.banner').on('transitionend webkitTransitionEnd oTransitionEnd', function () {
            //      clearInterval(time)
            // });
            
            for (var i = 1; i < 99999; i++)window.clearInterval(i);
          
            
            console.log('this is init');
        };
        
        Module.prototype.toggle = function ( opts ) {
            var jQuery = this.$ele;
            const bannerHeight = jQuery.css('height') >= '80px';
            bannerHeight ? this.open( opts) : this.close( opts);
        };

        Module.prototype.open = function ( opts ) {
            var jQuery = this.$ele;
            
           var time = setInterval(() => {
                console.log('setinterval')
            }, 50);
            $('.banner').on('transitionend webkitTransitionEnd oTransitionEnd', function () {
                clearInterval(time);
           });
    
            typeof(opts)==="number" ? setTimeout(function(){ open()},opts) : open();
         
            function open(){
                jQuery.removeClass("closed");
                jQuery.addClass("opened");



                // jQuery.addClass("opening");
                // $('.banner').on('transitionend webkitTransitionEnd oTransitionEnd', function () {
                //     jQuery.removeClass("opening");
                // });
                // jQuery.removeClass("opening");
                // jQuery.addClass("opened");

                $('.wrap_btn').text('收合')
            }
          
            console.log('this is open!!!:', opts);
        };
       
        Module.prototype.close = function ( opts ) {
            var jQuery = this.$ele;
            console.log('close opts',opts)
            var time = setInterval(() => {
                console.log('setinterval')
            }, 50);
            $('.banner').on('transitionend webkitTransitionEnd oTransitionEnd', function () {
                clearInterval(time);
           });
            typeof(opts)==="number" ? setTimeout(function(){ close()},opts) : close();
          
          function close(){
            // jQuery.addClass("closing");
            // jQuery.removeClass("closing");
            jQuery.addClass("closed");
            jQuery.removeClass("opened");
            $('.wrap_btn').text('展開')
          }

            console.log('this is close!!!:', opts);
            
        };
    

        $.fn[ModuleName] = function ( methods, options ) {
            return this.each(function(){
                var $this = $(this);
                var module = $this.data( ModuleName );
                var opts = null;
                if ( !!module ) {
                    if ( typeof methods === 'string' &&  typeof options === 'undefined' ) {
                        // console.log(' module[methods]();')
                        module[methods]();
                    } else if ( typeof methods === 'string' &&  typeof options === 'object' ) {
                        module[methods](options); 
                        //  console.log('module[methods](options)');
                    } else {
                        console.log('unsupported options!');
                        throw 'unsupported options!';
                    }
                } else {
                    opts = $.extend( {}, Module.DEFAULTS, ( typeof methods === 'object' && options ), ( typeof options === 'object' && options ) );
                    module = new Module(this, opts);
                    $this.data( ModuleName, module );
                    module.init(  methods );
                }
            });
        };
    
    })(jQuery);







