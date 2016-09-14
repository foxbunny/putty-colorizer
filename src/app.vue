<template>
  <nav class="selector">
    <a v-if="registryActive" v-on:click="hideRegistry" href="javascript:void(0)">Close</a>
    <a v-else v-on:click="showRegistry" href="javascript:void(0)">Registry File</a>
  </nav>

  <app-colorscheme :colors="colors"></app-colorscheme>
  <app-preview :colors="colors" :version="version" v-on:click="hideRegistry"></app-preview>
  <app-registry :colors="colors" :presets="presets" v-show="registryActive" transition="slide"></app-registry>
</template>

<script>
  import localStorage from 'local-storage';

  import ColorData, { DEFAULT_COLORS } from './color-data';
  
  import ColorScheme from './colorscheme.vue';
  import Preview from './preview.vue';
  import Registry from './registry.vue';

  const VERSION = '1.2.0-dev';

  export default {
    // Hooks
    ready: function () {
      document.onkeyup = event => {
        if (27 !== (event.which || event.keyCode)) return;
        this.registryActive = false; 
      };
    },

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
      colorArray: function (colors, previousColors) {
        localStorage('colors', colors);
      },

      presets: function (presets) {
        localStorage('presets', presets);
      }
    }
  };
</script>

<style lang="sass">
  .selector {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 10;

    a {
      display: inline-block;
      border: 1px solid #ddd;
      background: #555;
      color: #fff;
      text-decoration: none;
      padding: 0.4rem 1rem;
      border-radius: 5rem;
    }
  }
</style>