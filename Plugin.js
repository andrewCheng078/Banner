(function ($) {
    'use strict';
    var ModuleName = 'lbx_lnop';

    var Module = function (ele, options) {
        this.ele = ele;
        this.$ele = $(ele);
        this.option = options;
        this.class = null;
        this.whenClickCallback = "";
        this.toggleTime=NaN;
    };

    Module.DEFAULTS = {
        openAtStart: true,
        autoToggle: false, //open === true toggle will
        transition: true,
        whenClickCallback: function () {
            console.log('whenClickCallback,DEFAULTS');
        },
        button: {
            closeText: '收合', // [string]
            openText: '展開', // [string]
            class: 'btn' // [string]
        },
        class: {
            closed: 'closed', // [string]
                closing: 'closing', // [string]
                opened: 'opened', // [string]
                opening: 'opening' // [string]
        },
    };

    Module.prototype.init = function (opts) {
        const option = this.option;
        const btn_class = option.button.class;
        this.toggleTime = option.autoToggle;
        this.$ele.append(`<button class="${btn_class}"> 收合</button>`);

        let bannerButton = this.$ele.find(`.${btn_class}`);
        console.log('bannerButton', bannerButton)
        $(bannerButton).click(() => {
            this.$ele.lbx_lnop('toggle');
        })

        if (option.transition) {
            this.$ele.addClass('transition')
        } else {
            this.$ele.addClass('transitionClose')
        }

        if (option.openAtStart) {
            this.open()
        } else {
            this.close()
        };

        if (option.autoToggle) {
            this.toggle()
        };
        clearInterval(this.whenTransition);

        console.log('this is init');
    };
    Module.prototype.transition = function (opts) {
        const option = this.option;
        this.whenTransition = setInterval(() => {
            option.whenTransition();
        }, 25);

        this.$ele.on('transitionend ', () => {
            clearInterval(this.whenTransition);
        });
        console.log('transition')

    };

    Module.prototype.toggle = function (opts) {
        console.log('you toggle me', opts)
        const bannerHeight = this.$ele.css('height');

        if (bannerHeight >= '80px') {
            this.open();
            this.transition();
        } else {
            this.close();
            this.transition();
        }
    };

    Module.prototype.open = function (opts) {
        console.log('open opts');
        const option = this.option;
        const img = this.$ele.find('.img');
        const text = this.$ele.find(`.${option.button.class}`)
        if (typeof (this.toggleTime) === "number"&&this.class!==null) {
            const asycnTime = async () => {
                await setTimeout(() => {
                    this.class = "opened";
                    this.$ele.addClass(option.class.opening);
                    this.$ele.removeClass(option.class.closed);
                }, this.toggleTime)

                await this.$ele.on('transitionend ', () => {
                    if (this.class === "opened") {
                        this.class = "opened";
                        this.$ele.addClass(option.class.opened)
                        $(img).removeClass('moveImg');
                        this.$ele.removeClass(option.class.opening)
                    }
                });
                this.toggleTime = false

            }
            asycnTime();
        } else {
            console.log(this.class)
            if (this.class === null) {
                this.class = "opened";
                this.$ele.addClass(option.class.opened);
            } else if (this.class === "closed") {
                this.class = "opening";
                this.$ele.addClass(option.class.opening)
                $(img).removeClass('moveImg');
                this.$ele.removeClass(option.class.closed)
            }

        }

        this.$ele.on('transitionend ', () => {
            if (this.class === "opening") {
                this.class = "opened";
                this.$ele.addClass(option.class.opened)
                this.$ele.removeClass(option.class.opening)
            }
        });

        $(text).text(option.button.closeText);

        console.log('this is open!!!:');

    };

    Module.prototype.close = function (opts) {
        const option = this.option
        const img = this.$ele.find('.img');
        const text = this.$ele.find(`.${option.button.class}`)
        if (typeof (this.toggleTime) === "number"&&this.class!==null) {
            const asycnTime = async () => {
                await setTimeout(() => {
                    this.class = "closing";
                    this.$ele.addClass(option.class.closing);
                    this.$ele.removeClass(option.class.opened);
                }, this.toggleTime)
              
                await this.$ele.on('transitionend ', () => {
                    if (this.class === "closing") {
                        this.class = "closed";
                        this.$ele.addClass(option.class.closed);
                        $(img).addClass('moveImg');
                        this.$ele.removeClass(option.class.closing);
                    }
                });
                this.toggleTime = false;
            }
            asycnTime();
            
        } 
        else {
            if (this.class === null) {
                this.class = "closed";
                this.$ele.addClass(option.class.closed)
            } else if (this.class === "opened") {
                this.class = "closing";
                this.$ele.addClass(option.class.closing)
                this.$ele.removeClass(option.class.opened)
            }
        }

        this.$ele.on('transitionend ', () => {
            if (this.class === "closing") {
                this.class = "closed";
                this.$ele.addClass(option.class.closed)
                $(img).addClass('moveImg')
                this.$ele.removeClass(option.class.closing)
            }
        });

        $(text).text(option.button.openText)

        console.log('this is close!!!:', opts);

    };


    $.fn[ModuleName] = function (options) {
        console.log(options);
        return this.each(function () {
            var $this = $(this);
            var module = $this.data(ModuleName);
            var opts = null;
            if (!!module) {
                console.log('sttmethod',typeof options === 'string')
                if (typeof options === 'string' && typeof options !== 'undefined') {
                    module[options]();
                } else if (typeof options === 'string' && typeof options === 'object') {
                    module[options](options);
                } else {
                    console.log('unsupported options!');
                    throw 'unsupported options!';
                }
            } else {
                opts = $.extend({}, Module.DEFAULTS,(typeof options === 'object' && options));
                module = new Module(this, opts);
                $this.data(ModuleName, module);
                module.init();
            }
        });
    };

})(jQuery);