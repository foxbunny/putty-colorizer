var webpackConfig = require('./webpack.config.js');

webpackConfig.devtool = 'inline-source-map';

module.exports = function(config) {
  config.set({
    // Source files
    basePath: '',
    files: [
      {pattern: 'test/*-spec.js', watch: false}
    ],
    exclude: [
      '**/*.swp'
    ],
    preprocessors: {
      'test/*-spec.js': ['webpack', 'sourcemap']
    },

    // Reporting
    reporters: ['mocha'],
    logLevel: config.LOG_INFO,
    colors: true,

    // Runner configuration
    frameworks: ['jasmine'],
    browsers: ['Chrome', 'Firefox'],
    port: 9876,
    autoWatch: true,
    singleRun: false,
    concurrency: Infinity,

    // Webpack-specific
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: 'errors-only'
    }
  });
};
