import Vue from 'vue';
import preview from './templates/preview.html';

const CURSOR_BLINK_INTERVAL = 500;

var Preview = Vue.extend({
  props: ['colors', 'version'],
  template: preview,

  computed: {
    ansiColors: function () {
      return this.colors.slice(6);
    },

    foreground: function () {
      return this.colors[0];
    },

    background: function () {
      return this.colors[2];
    },
  },

  ready: function () {
    var cursor = document.getElementById('cursor');
    setInterval(() => {
      cursor.className = cursor.className ? '' : 'cursor';
    }, CURSOR_BLINK_INTERVAL);
  }
});

export default Preview;
