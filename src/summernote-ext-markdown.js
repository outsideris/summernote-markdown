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
  var $preview = $('<div>');

  $.summernote.addPlugin({
    name: 'markdown',
    init: function (layoutInfo) {
      // intialize as codeview
      layoutInfo.holder().summernote("toolbar.get", "codeview").click(); // workaround to switch codeview
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
