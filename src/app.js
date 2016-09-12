import Vue from 'vue';
import localStorage from 'local-storage';

import ui from './templates/ui.html';
import ColorData, { DEFAULT_COLORS } from './color-data';
import ColorScheme from './colorscheme';
import Preview from './preview';
import Registry from './registry';

const VERSION = '1.0.1';

var App = Vue.extend({
    template: ui,

    // Data

    data: () => {
      var colors;
      var presets;

      colors = ColorData.fromArray(
        localStorage.get('colors') || DEFAULT_COLORS);
      presets = localStorage.get('presets') || 'Default Settings';

      return {
        colors: colors,
        presets: presets,
        registryActive: false,
        version: VERSION
      };
    },

    computed: {
      colorArray: function () {
        return this.colors.map(function (c) {
          return c.value;
        });
      },
    },

    // Behavior

    methods: {
      showRegistry: function () {
        this.registryActive = true;
      },

      hideRegistry: function () {
        this.registryActive = false;
      }
    },

    // Components
    components: {
      'app-colorscheme': ColorScheme,
      'app-preview': Preview,
      'app-registry': Registry
    },

    watch: {
      colorArray: function (colors) {
        localStorage('colors', colors);
      },

      presets: function (presets) {
        localStorage('presets', presets);
      }
    }
});

export default App;
