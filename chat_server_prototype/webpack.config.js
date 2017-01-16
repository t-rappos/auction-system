module.exports = {
  entry: './app/app.jsx',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    root: __dirname,
    alias: {
      Main: 'app/components/Main.jsx',
      Redux:      'app/Redux.jsx',
      ServerAPI: 'app/api/ServerAPI.jsx',
      ChatComponent: 'app/components/ChatComponent.jsx',
      ChatInputFormComponent: 'app/components/ChatInputFormComponent.jsx',
      MessageComponent: 'app/components/MessageComponent.jsx',
      OnlineUsersListComponent: 'app/components/OnlineUsersListComponent.jsx',
      UsernameInputFormComponent: 'app/components/UsernameInputFormComponent.jsx',
      ChatContainer: 'app/containers/ChatContainer.jsx',
      CurrentUserContainer: 'app/containers/CurrentUserContainer.jsx',
      OnlineUsersContainer: 'app/containers/OnlineUsersContainer.jsx',
      ChatReducer: 'app/reducers/ChatReducer.jsx',
      CurrentUserReducers: 'app/reducers/CurrentUserReducers.jsx',
      OnlineUsersReducers: 'app/reducers/OnlineUsersReducers.jsx'
    },
    extensions: ['','.js','.jsx']
  },
  module: {
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
  }
};
