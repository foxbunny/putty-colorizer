module.exports = {
  entry: './src/index.js',
  output: {
    path: './static',
    publicPath: '/static/',
    filename: 'bundle.js',
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bin)/,
        loader: 'jshint-loader'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bin)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      { test: /\.vue$/, loader: 'vue' },
      { test: /\.scss$/, loader: 'style!css!autoprefixer!sass' },
      { test: /\.png$/, loader: 'file-loader' },
      { test: /\.jpg$/, loader: 'file-loader' }
    ]
  },
  jshint: {
    esversion: 6
  },
  devServer: {
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  },
  devtool: '#inline-source-map'
};
