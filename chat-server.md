# Chat Server

This application was created to test a proposed technology stack for web applications.
It was also successfully deployed on [heroku](https://chat-server-t-rappos.herokuapp.com/#/?_k=32gzvg)

![Home Page](chat-server-images/home.PNG)

## Features
- User can set name.
- User can see list of online users.
- User can post messages.
- User can see an up-to-date list of messages.
- Application runs in real-time without needing webpage refreshes.

## Technology Stack

### Front-end
- React
- Redux
- Socket.io
- Babel
- Webpack

### Back-end
- Node.js
- Express

### (Continuous) Deployment
- Github

### Testing
- TODO: create automated tests

### Continuous Integration
- TODO: set up Continuous integration with Travis-CI

### Package.json
```
"dependencies": {
  "axios": "^0.15.3",
  "babel-plugin-transform-class-properties": "^6.19.0",
  "babel-plugin-transform-runtime": "^6.15.0",
  "babel-polyfill": "^6.20.0",
  "babel-register": "^6.18.0",
  "body-parser": "^1.15.2",
  "dateformat": "^2.0.0",
  "express": "^4.14.0",
  "react": "^0.14.7",
  "react-dom": "^0.14.7",
  "react-redux": "^5.0.2",
  "react-router": "^2.0.0",
  "redux": "^3.6.0",
  "socket.io": "^1.7.2"
},
"devDependencies": {
  "babel-core": "^6.21.0",
  "babel-loader": "^6.2.10",
  "babel-preset-es2015": "^6.18.0",
  "babel-preset-react": "^6.5.0",
  "babel-preset-stage-0": "^6.16.0",
  "webpack": "^1.14.0"
}
```

## Design

### Front-end React Component Tree
![React Tree](chat-server-images/prop-tree.PNG)
This image displays the react components and the props being sent to children components.

### System Design
![Front-End](chat-server-images/front-end.PNG)
![Back-End](chat-server-images/back-end.PNG)

### Front-end Redux diagram
![Redux](chat-server-images/redux.PNG)
