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

// (function($){
    
//     $.fn.banner = function(action){
        
//         console.log($)
//     }
    
 
//  })(jQuery);  // <---呼叫並傳入 jQuery
(function($) {
    'use strict';
        var ModuleName = 'lbx_lnop';
    
        var Module = function ( ele, options ) {
            this.ele = ele;
            this.$ele = $(ele);
            this.option = options;
            
        };
    
        Module.DEFAULTS = {
            style: 'classname',
            openAtStart:true,
            autoToggle:true,
            transition: true,
            whenClickCallback: function() {
                console.log('whenClickCallback,DEFAULTS');
            }
        };

        Module.prototype.init = function ( opts ) {
            var jQuery = this.$ele;
            // jQuery.append(`<button class="wrap_btn"> Click Me</button>`)
            console.log('this is init');
            
        };
        
        Module.prototype.toggle = function ( opts ) {
            var jQuery = this.$ele;
                // jQuery.slideToggle("slow");
            // if(jQuery.css('display') == 'none') {
            //     //自己的处理
            //     jQuery.show();
            // } else {
            //     //自己的处理
            //     jQuery.hide();
            // }
        
        
          
        };
        Module.prototype.open = function ( opts ) {
            var jQuery = this.$ele;
            jQuery.show();
            console.log('this is open!!!:', opts);
        };
       
        Module.prototype.close = function ( opts ) {
            var jQuery = this.$ele;
            jQuery.addClass("close");
            // jQuery.hide();
            console.log('this is close!!!:', opts);
            
        };
    

        $.fn[ModuleName] = function ( methods, options ) {
            console.log('methods',methods,'options',options)
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
                    module.init( opts );
                }
            });
        };
    
    })(jQuery);





/*
$('.banner').banner({
	// 設定一開始是否為開或合
	openAtStart: true, // [boolean] true | false
	// 設定啟動後是否要自動開或合，若設為false，就不要自勳開合；若為true是馬上自動開合；若為數字是幾毫秒之後開合
	autoToggle: true, // [boolean|number] true | false | 3000
	// 設定收合展開按鈕
	button: {
		closeText: '收合', // [string]
		openText: '展開', // [string]
		class: 'btn' // [string]
	},
	// 設定模組在各狀態時的class
	class: {
		closed: 'closed', // [string]
		closing: 'closing', // [string]
		opened: 'opened', // [string]
		opening: 'opening' // [string]
	},
	// 是否要有transition效果
	transition: true,
	// 當有transition時，要執行的callback function
	whenTransition: function() {
		console.log('whenTransition');
	}
});

$('.banner').banner('toggle');

$('.banner').banner('open');

$('.banner').banner('close');




*/