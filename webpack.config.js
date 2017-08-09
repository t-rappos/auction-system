
var webpack = require("webpack");

module.exports = {
  entry: ['script!jquery/dist/jquery.min.js',
  'script!foundation-sites/dist/js/foundation.min.js',
  './app/app.jsx'],
  externals:{
    jquery:'jQuery',
    cheerio: 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },
  plugins:[
    new webpack.ProvidePlugin({
      '$':'jquery',
      'jQuery':'jquery'
    })
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    root: __dirname,
    extensions: ['','.js','.jsx']
  },
  module: {
    preLoaders: [
            // Javascript
            { test: /\.jsx?$/, loader: 'eslint', exclude: /node_modules/ }
        ],
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  eslint: {
        failOnWarning: false,
        failOnError: true
    }
};
