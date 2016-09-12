import 'babel-polyfill';
import './screen.css';

import App from './app';

global.onload = () => { new App({el: '#main'}); };
