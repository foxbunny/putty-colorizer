import $ from 'jquery';
import Vue from 'vue';
import ui from './templates/ui.html';

const VERSION = '0.0.3';

var App = Vue.extend({
    template: ui,

    // Hooks

    created: function () {
      // Values bound here are not reactive at all.
      this.version = VERSION;
    },

    // Data

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
        return this.activeView === 'preview';
      },
      registryShown: function () {
        return this.activeView === 'registry';
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
});

export default App;
