import 'babel-polyfill';
import './screen.css';

import $ from 'jquery';
import localStorage from 'local-storage';

import Vue from 'vue';
import ColorData, { DEFAULT_COLORS } from './color-data';
import ui from './templates/ui.html';

const VERSION = '1.0.0-dev';
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
      presetsArray: function () {
        return this.presets.split(',').map(function(preset) {
          return preset.trim();
        });
      },
      registryText: function () {
        var regText = 'Windows Registry Editor Version 5.00\n\n';
        var that = this;
        return regText + this.presetsArray.map(function(preset) {
          var regSection;

          if (preset === '') return null;

          // In the line below, note that we are not exactly doing URL quoting.
          // We only want to encode the space character.
          regSection = `[HKEY_CURRENT_USER\\Software\\SimonTatham\\PuTTY\\Sessions\\${ preset.replace(/ /g, '%20') }]\n`;
          return regSection + that.colors.map(function(color, index) {
            return `"Colour${index}"="${ color.registryValue }"`;
          }).join('\n');
        }).join('\n\n');
      },
      registryHref: function () {
        return 'data:text/plain;charset=utf-8,' +
          encodeURIComponent(this.registryText);
      },
      colorArray: function () {
        return this.colors.map(function (c) {
          return c.value;
        });
      },
      previewShown: function () {
        return this.activeView == 'preview';
      },
      registryShown: function () {
        return this.activeView == 'registry';
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
