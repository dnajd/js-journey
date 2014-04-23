// ------------------------------------------------------------
// Multiple Views
   console.log('%c✔ multiple_views.js', 'color: #2379cf');
// ------------------------------------------------------------

(function ($) {
  $.fn.templateUtil = function(options) {

    var el = $(this);

    //////////////////////
    // options
    $.fn.templateUtil.options = {
        data: {}
    };
    options = $.extend({}, $.fn.templateUtil.options, options);

    //////////////////////
    // define singleton
    var singleton = {

        fetchTemplate: function(tmpl_name) {
            if ( !singleton.tmpl_cache ) { 
                singleton.tmpl_cache = {};
            }

            if ( ! singleton.tmpl_cache[tmpl_name] ) {

                var tmpl_string;
                $.ajax({
                    url: tmpl_name,
                    method: 'GET',
                    async: false,
                    success: function(data) {
                        tmpl_string = data;
                    }
                });

                singleton.tmpl_cache[tmpl_name] = tmpl_string;
            }

            return singleton.tmpl_cache[tmpl_name];
        }
    };

    // fetch template
    var source = singleton.fetchTemplate(options.tmpl_name);
    
    // compile & prepend
    var template = Handlebars.compile(source);
    el.empty();
    el.prepend(template(options.data));
  };

})(jQuery);

