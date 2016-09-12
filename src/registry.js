import Vue from 'vue';
import registry from './templates/registry.html';

var Registry = Vue.extend({
  props: ['colors', 'presets'],
  template: registry,

  computed: {
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
    }
  }
});

export default Registry;
