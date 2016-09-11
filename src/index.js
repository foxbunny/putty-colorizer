import 'babel-polyfill';
import './screen.css';

import $ from 'jquery';
import localStorage from 'local-storage';

import App from './app';
import ColorData, { DEFAULT_COLORS } from './color-data';


const CURSOR_BLINK_INTERVAL = 500;


$(function() {
  var colors;
  var presets;
  var vm;

  // span.swatch is an alias for the color input element
  $('body').on('click', '.swatch', function(e) {
    var el = $(this);
    var target = $(el.data('target'));
    target.click();
  });

  colors = ColorData.fromArray(
    localStorage.get('colors') || DEFAULT_COLORS);
  presets = localStorage.get('presets') || 'Default Settings';

  vm = new App({
    el: '#main',

    data: {
      colors: colors,
      presets: presets,
    },

    ready: function () {
      var cursor = $('#cursor');
      setInterval(function () {
        cursor.toggleClass('cursor');
      }, CURSOR_BLINK_INTERVAL);
    },

    watch: {
      'colorArray': function (colors) {
        localStorage('colors', colors);
      },
      'presets': function (presets) {
        localStorage('presets', presets);
      }
    }
  });
});
