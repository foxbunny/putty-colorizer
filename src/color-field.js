import Vue from 'vue';
import colorField from './templates/color-field.html';

var ColorField = Vue.extend({
  props: ['color'],
  template: colorField,

  ready: function () {
    // Input does not change, so no need to make it a reactive property
    this.input = document.getElementById(this.color.id);
  },

  methods: {
    // The swatch element is a proxy for the actual input. When the swatch
    // element is clicked, it activates the actual input by using the activate
    // method and passing it the input's id.
    activate: function (id) {
      this.input.click();
    }
  }
});

export default ColorField;
