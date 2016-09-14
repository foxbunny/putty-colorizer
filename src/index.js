import 'babel-polyfill';
import './scss/screen.scss';

import Vue from 'vue';

import App from './app.vue';

new Vue({
	el: '#main',
	template: '<app-main/>',
	components: {
		'app-main': App
	}
});