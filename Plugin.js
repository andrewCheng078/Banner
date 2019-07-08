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

(function ($) {
    'use strict';
    var ModuleName = 'lbx_lnop';

    var Module = function (ele, options) {
        this.ele = ele;
        this.$ele = $(ele);
        this.option = options;
        this.class = null;
        this.whenClickCallback = "";

    };

    Module.DEFAULTS = {
        openAtStart: true,
        autoToggle: false, //open === true toggle will
        transition: true,
        whenClickCallback: function () {
            console.log('whenClickCallback,DEFAULTS');
        }
    };

    Module.prototype.init = function (opts) {
        var jQuery = this.$ele;
        $('.banner').append(` <button class="wrap_btn"> 收合</button>`)
        $('.wrap_btn').click(function () {
            $('.banner').lbx_lnop('toggle');
        })
        if (opts.transition) {
            jQuery.addClass('transition')
        }else{
            jQuery.addClass('transitionClose')
        };
        if (opts.openAtStart) {
            this.open(opts.openAtStart)
        } else {
            this.close(opts.openAtStart)
        };
        if (opts.autoToggle) {
            this.toggle(opts.autoToggle)
        };
        if(opts.whenTransition === undefined){
            console.log('noooooo we need default')
        }
        this.whenClickCallback = opts.whenTransition;
        
        //clear all interval
        for (var i = 1; i < 99999; i++)
        window.clearInterval(i);

        console.log('this is init');
    };
    Module.prototype.transition = function (opts) {
        console.log(opts)
        var whenTransition = setInterval(() => {
            this.whenClickCallback();
        }, 25);
        $('.banner').on('transitionend ', function () {
            clearInterval(whenTransition);
        });


    };

    Module.prototype.toggle = function (opts) {
        var jQuery = this.$ele;
        const bannerHeight = jQuery.css('height');

        if (bannerHeight >= '80px') {
            this.open(opts);
            this.transition();
        } else {
            this.close(opts);
            this.transition();
        }

    };

    Module.prototype.open = function (opts) {

        var jQuery = this.$ele;

        if (typeof (opts) === "number") {
            setTimeout(() => {
                this.class = "opened";
                jQuery.addClass("opened");
                jQuery.removeClass("closed");
            }, opts)
        } else {

            if (this.class === null) {
                this.class = "opened";
                jQuery.addClass("opened");
            } else if (this.class === "closed") {
                this.class = "opening";
                jQuery.addClass("opening")
                jQuery.removeClass("closed")
            }
        }


        $('.banner').on('transitionend ', () => {
            if (this.class === "opening") {
                this.class = "opened";
                jQuery.addClass("opened")
                jQuery.removeClass("opening")
            }
        });
        $('.wrap_btn').text('收合');

        console.log('this is open!!!:', opts);

    };

    Module.prototype.close = function (opts) {
        var jQuery = this.$ele;
        // typeof(opts)==="number" ? setTimeout(function(){ close()},opts) : close();
        if (typeof (opts) === "number") {
            setTimeout(() => {
                this.class = "closed";
                jQuery.addClass("closed");
                jQuery.removeClass("opened");
            }, opts)
        } else {
            if (this.class === null) {
                this.class = "closed";
                jQuery.addClass("closed")
            } else if (this.class === "opened") {
                this.class = "closing";
                jQuery.addClass("closing")
                jQuery.removeClass("opened")
            }
        }

        $('.banner').on('transitionend ', () => {
            if (this.class === "closing") {
                this.class = "closed";
                jQuery.addClass("closed")
                jQuery.removeClass("closing")
            }
        });

        $('.wrap_btn').text('展開')

        console.log('this is close!!!:', opts);

    };


    $.fn[ModuleName] = function (methods, options) {
        return this.each(function () {
            var $this = $(this);
            var module = $this.data(ModuleName);
            var opts = null;
            if (!!module) {
                if (typeof methods === 'string' && typeof options === 'undefined') {
                    // console.log(' module[methods]();')
                    module[methods]();
                } else if (typeof methods === 'string' && typeof options === 'object') {
                    module[methods](options);
                    //  console.log('module[methods](options)');
                } else {
                    console.log('unsupported options!');
                    throw 'unsupported options!';
                }
            } else {
                opts = $.extend({}, Module.DEFAULTS, (typeof methods === 'object' && options), (typeof options === 'object' && options));
                module = new Module(this, opts);
                $this.data(ModuleName, module);
                module.init(methods);
            }
        });
    };

})(jQuery);