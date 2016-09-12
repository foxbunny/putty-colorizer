import 'babel-polyfill';
import './screen.css';

import localStorage from 'local-storage';

import App from './app';
import ColorData, { DEFAULT_COLORS } from './color-data';

global.onload = () => {
  var colors;
  var presets;
  var vm;

  colors = ColorData.fromArray(
    localStorage.get('colors') || DEFAULT_COLORS);
  presets = localStorage.get('presets') || 'Default Settings';

  vm = new App({
    el: '#main',

    data: {
      colors: colors,
      presets: presets,
      registryActive: false
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
};
