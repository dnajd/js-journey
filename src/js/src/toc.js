// ------------------------------------------------------------
// TOC
   console.log('%c✔ toc.js', 'color: #2379cf');
// ------------------------------------------------------------

(function ($) {
  $.fn.toc = function(options) {

    options = $.extend({}, $.fn.toc.options, options);

    // toc vars
    var el = $(this),

        // Set default options
        tocLinks = options.tocLinks;


    // Singleton pattern
    var toc = {
      build: function() {
        var data = this.data();
        this.bindToTemplate(data);
      },

      // Generate data from header tags
      data: function() {

      // Define toc data
       var data = { sections: [] };

      // Loop through header tags
      $(tocLinks).each(function() {

          var el = $(this),
              title = el.text(),
              link = "#" + el.attr("id");

          // Push title/links to sections array in data object
          data.sections.push({ title: title, link: link });
        });

       return data;
      },

      // Bind data to template using handlebars
      bindToTemplate: function(data) {
        var source = $("#toc-template").html();
        var template = Handlebars.compile(source);

        // Prepend handlebars template to HTML
        el.prepend(template(data));
      }
    };

    // Init toc.build
    toc.build();
  };

  // toc default options
  $.fn.toc.options = {
    tocLinks: "h2"
  };

})(jQuery);


// Initialize toc with custom options

$("#toc").toc({
  // tocLinks: "h3" // Change toc header links
});
















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
