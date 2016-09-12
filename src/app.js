import Vue from 'vue';
import ui from './templates/ui.html';

import ColorScheme from './colorscheme';
import Preview from './preview';
import Registry from './registry';


const VERSION = '1.0.0-dev';

var App = Vue.extend({
    template: ui,

    // Hooks

    created: function () {
      // Values bound here are not reactive at all.
      this.version = VERSION;
    },

    // Data

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
    }
});

export default App;
