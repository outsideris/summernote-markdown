(function (factory) {
  'use strict';

  /* global define */
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else {
    // Browser globals: jQuery
    factory(window.jQuery);
  }
}(function ($) {
  'use strict';

  if (typeof window.markdownit !== 'function') {
    throw new Error( "Markdown plugin requires markdown-it." );
  }

  var md = window.markdownit();
  var tmpl = $.summernote.renderer.getTemplate();
  var $preview = $('<div>');

  $.summernote.addPlugin({
    name: 'markdown',
    init: function (layoutInfo) {
      // intialize as codeview
      layoutInfo.holder().summernote("toolbar.get", "codeview").click(); // workaround to switch codeview
      layoutInfo.holder().summernote("toolbar.get", "preview").toggleClass('disabled');
      //layoutInfo.holder().summernote('codeview.activate');

      // make preview area
      var $editable = layoutInfo.editable();
      $preview.attr('style', $editable.attr('style')).hide().insertAfter($editable);
    },
    buttons: {
      preview: function (lang, options) {
        return tmpl.iconButton(options.iconPrefix + 'toggle-on', {
          event: 'showPreview',
          title: lang.markdown.preview,
          hide: true
        });
      }
    },

    events: {
      showPreview: function(event, editor, layoutInfo) {
        $preview.html(md.render(layoutInfo.holder().code()));
        layoutInfo.codable().toggle();
        $preview.toggle();
      }
    },

    // define language
    langs: {
      'en-US': {
        markdown: {
          preview: 'Preview'
        }
      }
    }
  });
}));
