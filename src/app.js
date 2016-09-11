import 'babel-polyfill';
import './screen.css';

import $ from 'jquery';
import localStorage from 'local-storage';

import Vue from 'vue';
import ColorData, { DEFAULT_COLORS } from './color-data';
import ui from './templates/ui.html';

const VERSION = '0.0.1';
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
  presets = localStorage.get('presets') || 'Default';
  vm = new Vue({
    el: '#main',
    template: ui,

    // Hooks
    ready: function () {
      var cursor = $('#cursor');
      setInterval(function () {
        cursor.toggleClass('cursor');
      }, CURSOR_BLINK_INTERVAL);
    },

    // Data
    data: {
      version: VERSION,
      colors: colors,
      presets: presets,
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
      },
      colorArray: function () {
        return this.colors.map(function (c) {
          return c.value;
        });
      }
    },

    // Behavior
    methods: {
      showPreview: function () {
        this.activeView = 'preview';
      },
      showRegistry: function () {
        this.activeView = 'registry';
      }
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
