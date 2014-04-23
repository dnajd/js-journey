// ------------------------------------------------------------
// Fake App
   console.log('%c✔ fake_app.js', 'color: #2379cf');
// ------------------------------------------------------------

(function ($) {
  
  ///////////////////////////
  // WELCOME VIEW
  $.fn.welcomeView = function(options) {

    // el & options
    var el = $(this);
    $.fn.templateUtil.options = {
        test: 'this is data'
    };
    options = $.extend({}, $.fn.templateUtil.options, options);

    // private methods
    var privateObj = {

        loadView: function() {
        
            // load template
            el.templateUtil({
              tmpl_name: '/fake_app/welcome.tmpl.html',
              data: options
            });

            // events -> mediator
            $('#next-link').click(function(){
                mediator.trigger('welcomeView-nextViewImpl');
            });
        },

        nextViewImpl: function(){
            el.goodbyeView();
        }
    };

    // mediator -> impl
    var mediator = $({});
    mediator.on('welcomeView-nextViewImpl', privateObj.nextViewImpl);

    // init
    var source = privateObj.loadView();
  };

  ///////////////////////////
  // GOODBYE VIEW
  $.fn.goodbyeView = function(options) {

    // el & options
    var el = $(this);
    $.fn.templateUtil.options = {};
    options = $.extend({}, $.fn.templateUtil.options, options);
    
    // private methods
    var privateObj = {

        loadView: function() {
        
            // load template
            el.templateUtil({
              tmpl_name: '/fake_app/goodbye.tmpl.html',
              data: {}
            });
        }
    };

    // mediator -> impl
    var mediator = $({});

    // init
    var source = privateObj.loadView();
  };

})(jQuery);

