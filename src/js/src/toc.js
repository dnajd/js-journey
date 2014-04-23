// ------------------------------------------------------------
// TOC
   console.log('%c✔ toc.js', 'color: #2379cf');
// ------------------------------------------------------------

(function ($) {
  $.fn.toc = function(options) {

    var el = $(this);

    //////////////////////
    // options
    options = $.extend({
      tocLinks: "h2",
      templateId: "toc-template"
    }, $.fn.toc.options, options);

    //////////////////////
    // define singleton
    var toc = {

      build: function() {
        var data = this.data();
        this.bindToTemplate(data);
      },

      // gen data from options.tocLinks
      data: function() {

        // init data
        var data = { sections: [] };

        // loop each options.tocLinks
        $(options.tocLinks).each(function() {

          // title & link
          var tocLinkEl = $(this);
          var title = tocLinkEl.text();
          var link = "#" + tocLinkEl.attr("id");

          // push to data.sections array
          data.sections.push({ title: title, link: link });
        });

       return data;
      },

      // bind data to template (handlebars)
      bindToTemplate: function(data) {

        // compile
        var source = $("#" + options.templateId).html();
        var template = Handlebars.compile(source);

        // prepend
        el.prepend(template(data));
      }
    };

    //////////////////////
    // build singleton
    toc.build();
  };

})(jQuery);


/////////////////////////////////
// OLD
/////////////////////////////////

// (function ($) {

//   /////////////////////////////////
//   // PROTOTYPE: Table Of Contents
//   function TableOfContents() {}
//   TableOfContents.prototype = {

//     /////////////////////////////////
//     // Public: call this to build toc
//     buildTOC: function() {
//       var data = this.buildDataFromEl();
//       this.bindToTemplate(data);
//     },

//     /////////////////////////////////
//     // Private: Generates data from h2 elements
//     // Returns: data.sections[]
//     buildDataFromEl: function() {

//       // Create data with an array
//       var data = { sections: [] };

//       // h2 elements
//       $("h2").each(function() {

//         var el = $(this),
//             title = el.text(),
//             link = "#" + el.attr("id");

//         // Add key/value pairs to the data object
//         data.sections.push({ title: title, link: link });
//       });

//       return data;
//     },

//     /////////////////////////////////
//     // Private: Bind data to template
//     bindToTemplate: function(data) {

//       // Setup Handlebars templating
//       var source = $("#toc-template").html();
//       var template = Handlebars.compile(source);

//       // Combine the template and data model
//       // and append the HTML to the <body>
//       $("#toc").prepend(template(data));

//     }
//   };

//   /////////////////////////////////
//   // run it
//   new TableOfContents().buildTOC();

// })(jQuery);
