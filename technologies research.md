# Technologies Research
This document researches different web technologies and provides a justified selection of technologies that will be used for this system.

## In Brief

https://medium.com/reactspeed/react-speed-coding-technology-stack-d0e824f2d954#.iy6qyed9b

What software can be used for specific purposes?

### Tracking Software
#### Trello
- *How do people usually use trello in development workflows?*
- *Can it be used to create issues or tickets?*
- *Does it have integration with other issue / ticketing webservices?*
  - *What benefit would it add?*

#### Github

- *Why use github?*
- *What is the main workflow*

##### Issues
- Is integrated with trello
- Integration with travis-ci

##### Pull requests

- Can run tests before commit to master
- *What is the usually workflow?*

#### Jira
#### Bugzilla


### Continuous Integration / Deployment
https://nodesource.com/resources/#webinar
- needs test driven development

#### Docker?
https://resources.nodesource.com/getting-started-with-node-docker-and-kubernetes

#### Jenkins-CI
- steep learning curve

#### Travis-CI
- simpler
- nodeJS - NPM for dependancy management
- make sure code coverage is tested as well
-
"The correct process is to write your new code on a branch. Push to that branch. Create a pull request in github. Then only merge to master if the Travis build passes."

https://github.com/dwyl/learn-travis
https://github.com/dwyl/learn-tdd

### Testing
- write tests
- only write code to ensure that the current tests pass
- code coverage - write tests to run program through all branches
  - blanket.js
  - istanbul
  - codecov.io
- javascript - JSHint - static analysis
- QUnit - javascript unit testing framework
- nodeJS - uses Gulp?

### Hosting
- Heroku
- Travis-CI heroku integration
  - https://www.wlangiewicz.com/2016/03/30/setup-ci-build-pipeline-travis-ci-heroku-sbt/

### Front Ends
A list of technologies used to create websites/UIs

### Templating Engines
Replaces variables with values within a HTML file before it is served to the client.

- Jade
- EJS

### Back Ends
A  list of technologies used to create server functionality

### Authentication

Passport (NodeJS)
Express compatible https://github.com/expressjs/express/tree/master/examples/auth

### Database Storage

tutorial about handling multiple users
https://codeforgeek.com/2015/01/nodejs-mysql-tutorial/

### RESTful
https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4

### Single page apps
https://scotch.io/tutorials/single-page-apps-with-angularjs-routing-and-templating

# In Detail

Further explanation about each technology

## Node JS

- **What does it do?**
- Runs JavaScript environment without a browser, which can be used to create a web server.
- Uses NPM for package/dependancy management, allowing other packages (e.g. Express, React) to be downloaded and installed easily.
- Asyncronous, no threads, no blocking
    - An event will fire when the blocking resource is released and in the meanwhile other code (in the event loop) will be run.
- Child processes support multiprocessing or other low level functionality
- Has an event loop, which runs call-backs and processes events


- **Where does it fit in the stack?**
- Javascript runtime that executes on the server (Server-side)
- Creates a a webpage to be served to the user which can be interacted with. The webpage served will have HTML and JS functionality. Although it is possible to run NodeJS client-side but it isn't included by default (Browserify, Bower).


- **What is it usually used for?**
- Can be made into a replacement for something like an Apache webserver

## Java/Spring

- *What does it do?*
- *Where does it fit in the stack?*
- *What is it usually used for?*

## React

- *What does it do?*
- *Where does it fit in the stack?*
- *What is it usually used for?*

## AnglularJS

- Frontend,
- Controllers
- Services
  - API Calls to node backend, retrieve data in JSON format?

## Bootstrap

## Express

- **What does it do?**
- It's a web application (server) framework,
- Simplifies the construction of a web-server
- Focus on building site logic and content

- **Where does it fit in the stack?**
- Back-end / Server-side
- Usually used with AngularJS frontend, and MongoDB (MEAN Stack) https://scotch.io/tutorials/setting-up-a-mean-stack-single-page-application (MVC example here)
- Can be used with a templating engines
-

- **What is it usually used for?**

## Redux

- *What does it do?*
- *Where does it fit in the stack?*
- *What is it usually used for?*



https://spring.io/guides/tutorials/react-and-spring-data-rest/

## nodejs Passport
  - https://code.tutsplus.com/tutorials/authenticating-nodejs-applications-with-passport--cms-21619

## MySql

## PostgreSQL

## MongoDB

# Chosen Stack


# How to model and design for this stack

**Questions that I want to answer:**

- How to create an OO model design for this system that is applicable with the chosen technology stack.
- What 'systems' do we  need to model?
- What technologies will be used, what they do, and where do they fit in the stack?
- Is modelling the same for each technology, or do some techs not support OO?
- Is it possible to design the model in a language + tech nonspecific way?
- How are webservers + front ends usually modelled?


Express MVC
https://github.com/expressjs/express/tree/master/examples/mvc
