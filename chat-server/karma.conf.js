var webpackConfig = require('./webpack.config.js');

module.exports = function(config){
  config.set({
    browsers: ['Firefox'],
    singleRun: true,
    frameworks: ['mocha'],
    files: [
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/foundation-sites/dist/js/foundation.min.js',
      'app/tests/**/*.text.jsx',
            'http://localhost:3000/socket.io/socket.io.js'],
    preprocessors: {
      'app/tests/**/*.text.jsx':['webpack','sourcemap']
    },
    reporters: ['mocha'],
    client:{
      mocha: {
        timeout: '5000'
      }
    },
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    }
  });
};
