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
      Nav: 'app/components/Nav.jsx',
      ServerInventory: 'app/components/ServerInventory.jsx',
      TabLogin: 'app/components/TabLogin.jsx',
      TabView: 'app/components/TabView.jsx',
      UserInventory:  'app/components/UserInventory.jsx',
      UserList:       'app/components/UserList.jsx',
      UserLoginList:  'app/components/UserLoginList.jsx',
      UserLogin:  'app/api/UserLogin.jsx',
      ListItem:   'app/components/ListItem.jsx',
      List:       'app/components/List.jsx',
      Redux:      'app/Redux.jsx'
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
