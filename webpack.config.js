
var webpack = require("webpack");

module.exports = {
  entry: ['script!jquery/dist/jquery.min.js',
  'script!foundation-sites/dist/js/foundation.min.js',
  './app/app.jsx'],
  externals:{
    jquery:'jQuery'
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
    alias: {
      Main: 'app/components/Main.jsx',
      ReduxWrapper:      'app/ReduxWrapper.jsx',
      ServerAPI: 'app/api/ServerAPI.jsx',
      ChatComponent: 'app/components/ChatComponent.jsx',
      ChatInputFormComponent: 'app/components/ChatInputFormComponent.jsx',
      MessageComponent: 'app/components/MessageComponent.jsx',
      OnlineUsersListComponent: 'app/components/OnlineUsersListComponent.jsx',
      UserComponent: 'app/components/UserComponent',
      UsernameInputFormComponent: 'app/components/UsernameInputFormComponent.jsx',
      ChatContainer: 'app/containers/ChatContainer.jsx',
      ChatInputFormContainer: 'app/containers/ChatInputFormContainer.jsx',
      UsernameInputFormContainer: 'app/containers/UsernameInputFormContainer.jsx',
      OnlineUsersListContainer: 'app/containers/OnlineUsersListContainer.jsx',
      ChatReducer: 'app/reducers/ChatReducer.jsx',
      CurrentUserReducer: 'app/reducers/CurrentUserReducer.jsx',
      OnlineUsersReducer: 'app/reducers/OnlineUsersReducer.jsx',
      Actions: 'app/actions/index.js',
    },
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
    },
};
