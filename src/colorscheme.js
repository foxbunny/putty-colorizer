import Vue from 'vue';
import ColorField from './color-field';
import colorScheme from './templates/colorscheme.html';

var ColorScheme = Vue.extend({
  props: ['colors'],
  template: colorScheme,
  components: {
    'app-color-field': ColorField
  }
});

export default ColorScheme;
