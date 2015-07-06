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

  var tmpl = $.summernote.renderer.getTemplate();

  $.summernote.addPlugin({
    name: 'markdown',
    init: function (layoutInfo) {
      // intialize as codeview
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
        var $note = layoutInfo.holder();
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
