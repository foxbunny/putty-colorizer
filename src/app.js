import 'babel-polyfill';
import ui from './templates/ui.html';
import Vue from 'vue';
import ColorData from './color-data';
import $ from 'jquery';
import './screen.css';

const VERSION = '0.0.1';
const CURSOR_BLINK_INTERVAL = 500;

$(function() {
  // span.swatch is an alias for the color input element
  $('body').on('click', '.swatch', function(e) {
    var el = $(this);
    console.log(el.data('target'));
    var target = $(el.data('target'));
    target.click();
  });

  var vm = new Vue({
    el: '#main',
    template: ui,
    ready: function () {
      var cursor = $('#cursor');
      setInterval(function () {
        cursor.toggleClass('cursor');
      }, CURSOR_BLINK_INTERVAL);
    },
    data: {
      version: VERSION,
      colors: [
        new ColorData('Default Foreground', 131, 148, 150),
        new ColorData('Default Bold Foreground', 147, 161, 161),
        new ColorData('Default Background', 0, 43, 54),
        new ColorData('Default Bold Background', 7, 54, 66),
        new ColorData('Cursor Text', 0, 43, 54),
        new ColorData('Cursor Color', 238, 232, 213),
        new ColorData('ANSI Black', 7, 54, 66),
        new ColorData('ANSI Black Bold', 0, 43, 56),
        new ColorData('ANSI Red', 220, 50, 47),
        new ColorData('ANSI Red Bold', 203, 75, 22),
        new ColorData('ANSI Green', 133, 153, 0),
        new ColorData('ANSI Green Bold', 88, 110, 117),
        new ColorData('ANSI Yellow', 181, 137, 0),
        new ColorData('ANSI Yellow Bold', 101, 123, 131),
        new ColorData('ANSI Blue', 38, 139, 210),
        new ColorData('ANSI Blue Bold', 131, 148, 150),
        new ColorData('ANSI Magenta', 211, 54, 130),
        new ColorData('ANSI Magenta Bold', 108, 113, 196),
        new ColorData('ANSI Cyan', 42, 161, 152),
        new ColorData('ANSI Cyan Bold', 147, 161, 161),
        new ColorData('ANSI White', 238, 232, 213),
        new ColorData('ANSI White Bold', 253, 246, 227)
      ],
      presets: 'Default',
      activeView: 'preview'
    },
    computed: {
      ansiColors: function() {
        return this.colors.slice(6);
      },
      registryText: function () {
        var regText = `Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\\Software\\SimonTatham\\PuTTY\\Sessions\\Default]
`;
        this.colors.forEach(function(color, index) {
          regText += `"Colour${index}"="${ color.registryValue }"\n`;
        });

        return regText;
      }
    },
    methods: {
      showPreview: function () {
        this.activeView = 'preview';
      },
      showRegistry: function () {
        this.activeView = 'registry';
      }
    }
  });
});
