# Technologies Research
This document explores different web technologies / ideologies and provides a justified selection that will be used during the development of this system.

~~[https://medium.com/reactspeed/react-speed-coding-technology-stack-d0e824f2d954#.iy6qyed9b]~~

## Agile Development or Alternatives

## Tracking Software
### Trello
- **How do people usually use trello in development workflows?**
- Can be used to sort and organise tasks in order of priority
- Tasks can be given due dates
- Can be utilised to conform to agile principles
- assign color labels to people to delegate work
- **Cool workflow** https://gist.github.com/slugbyte/6c1f85eb146364d13d93
- Collaborative
- Brainstorming
- Catergorising
- Has addons for SCRUM and Agile workflows (TODO: Check this out)
- Different boards for
  - Planning/Development (With columns)
    - New Tasks
    - Needs definition
    - Backlog (Priorities tasks)
    - Sprint (Focused tasks)
    - Blocked (Stuff that needs to wait for external forces)
    - In Progress
    - For Staging / Testing / Ready for pull (Pull Request)
    - Completed
  - Bugs (With columns...)
    - Triage
    - Low handing fruit
    - Next Sprint
- **Can it be used to create issues or tickets?**

- Good for planning, using tasks
- **Can tasks be exported to github as issues?** Maybe https://zapier.com/zapbook/github/trello/

- **Does it have integration with other issue / ticketing webservices?**

- Can attach github isssues / commits / pull requests to tasks
- Can see status of pull requests and commits (passed tests etc...)

  - **What benefit would it add?**

### Github

- *Why use github?*
  - Online GIT repository
  - Widely used, great integration with other online services (travis-ci, heroku)
- *What is the main workflow*
  - create issues on github or tickets on trello
  - make changes to code in local development branch
  - create pull request (link issue) or push changes to staging branch (link commit to trello ticket)
  - passes tests, merge to master or production branches

- **TODO: Read This** http://hugogiraudel.com/2015/08/13/github-as-a-workflow/
- **TODO: Research this (similar to trello)** https://waffle.io/

#### Github Issues
- Localised to repository, high visibility
- Can be referenced from Trello
- Whats more effective for solo development? Trello tickets or GitHub issues?

#### Github Pull requests

- Can run tests before commit to desired branch
- Completed code can be inspected and voted on for satisfaction rating
- Feature can be discussed and reviewed allowing it be become satisfactory to pass vote requirement
- Commit can change to satisfy review
- Ensures code pushed to repository compiles and passes tests

- *What is the usually workflow?*
"The correct process is to write your new code on a branch. Push to that branch. Create a pull request in github. Then only merge to master if the Travis build passes."
https://github.com/dwyl/learn-travis
https://github.com/dwyl/learn-tdd

### Jira
### Bugzilla


## Continuous Integration / Deployment
~~[https://nodesource.com/resources/#webinar]~~

### Docker
https://resources.nodesource.com/getting-started-with-node-docker-and-kubernetes

### Jenkins-CI
- steep learning curve

### Travis-CI
- easy
- nodeJS - NPM for dependancy management
- runs NPM install and NPM test, outcome determines whether build passes or failes
  - Node (w/ NPM) can be configured to run tests, and code coverage tests

## Testing
- write tests
- only write code to ensure that the current tests pass
  - refactor code after test passes
- code coverage - write tests to run program through all branches
  - blanket.js
  - **istanbul**
  - codecov.io
- javascript - JSHint - static analysis (Linting)
- QUnit - javascript unit testing framework
- nodeJS (Used this stack in chat-server, see [chat-server](chat-server.md) for more testing details)
  - karma
    - spawns webserver and runs tests in browser
  - mocha
    - javascript test framework
  - jquery
    - for inspecting the DOM
  - expect
    - better syntax and functionality for making test assertions.

## Automation
- Gulp

## Hosting
- Heroku
  - A great tutorial on how to host a react-webpack-nodejs project on heroku http://ditrospecta.com/javascript/react/es6/webpack/heroku/2015/08/08/deploying-react-webpack-heroku.html
- Travis-CI heroku integration
  - https://www.wlangiewicz.com/2016/03/30/setup-ci-build-pipeline-travis-ci-heroku-sbt/
  - ~18 hr max uptime on free accounts
  - no traffic causes the server to idle (running->shutdown->(request)->running)
    - approx 30 mins after last request
    - causes all server state to be lost due to shutdow & restart
    - **make sure all persistant data and server state is saved to a database**
    - This isn't a problem with payed servers, but for scaling + parrellelism, individual servers should be stateless (e.g. RESTful)

## Front Ends
A list of technologies used to create websites/UIs

### Templating Engines
Replaces variables with values within a HTML file before it is served to the client.

- Jade
- EJS

### SCSS

### Foundation (Used in prototype, client-server)
- Improved CSS e.g. grids and nice screen-size modifiers  

### Bootstrap

### React (Used in client-server )

Simplifies thinking about frontend components, react components presentation are directly dependant on what properties they are defined with and their current state. This ensures that behaviour is defined locally, within the component. Components representation is specified in html (where they are displayed, what they look like) and the behaviour is implemented as OO javascript code.

- *What does it do?*
  - View (from MVC)
  - Library (not framework)
  - Simple

- *Where does it fit in the stack?*
  - Front-end functionality


**Good tutorial TODO: read this**
https://www.smashingmagazine.com/2016/03/server-side-rendering-react-node-express/
https://scotch.io/tutorials/react-on-the-server-for-beginners-build-a-universal-react-and-node-app

### AnglularJS

- Data Binding Framework (Single Page Applications SPA)
  - Only URL part after # changes (allows back/forward)
- Frontend,
- Controllers
- Services
  - API Calls to node backend, retrieve data in JSON format?

**React vs Angular TODO: Read This**
https://www.codementor.io/reactjs/tutorial/react-vs-angularjs

Complex info + testing
https://medium.com/javascript-scene/angular-2-vs-react-the-ultimate-dance-off-60e7dfbc379c#.vpq6z0ht4

### AngularJS 2
no controllers, only components
router wires components together
typscript language
  compiles to JS
components
  classes
  decoupled from DOM
    binding?
directives
  interact with DOM
routers
  navigation
services
  class that encapsulates non ui behaviour
  comunicates with server
a node package
good with unit testing
dependancy injection for construction?

good intro
https://www.youtube.com/watch?v=_-CD_5YhJTA

## Redux

- *What does it do?*
- *Where does it fit in the stack?*
- *What is it usually used for?*

## jQuery
https://spring.io/guides/tutorials/react-and-spring-data-rest/

## Back Ends
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



## Express
https://code.tutsplus.com/tutorials/introduction-to-express--net-33367
- **What does it do?**
- It's a web application (server) framework,
- Simplifies the construction of a web-server
- Focus on building site logic and content
- Middleware based (Single pipe dataflow + processing)
  - Can apply filter to requests before getting processed by router/server (Used to be Connect)
  - Complicated, see
  http://expressjs.com/en/guide/using-middleware.html
  https://www.safaribooksonline.com/blog/2014/03/10/express-js-middleware-demystified/
  - Unit testing is usually placed here (mocha)
  - http://www.slideshare.net/morrissinger/unit-testing-express-middleware
- Used for routing
  - **Explain more here**
  - How the server responds to the clients request, URI and Request Method (GET, POST)
  - app.METHOD(PATH, HANDLER)
  - https://expressjs.com/en/starter/basic-routing.html
- **Where does it fit in the stack?**
- Back-end / Server-side
- Usually used with AngularJS frontend, and MongoDB (MEAN Stack) https://scotch.io/tutorials/setting-up-a-mean-stack-single-page-application (MVC example here)
- Can be used with a templating engines
-

- **What is it usually used for?**

## nodejs Passport
  - https://code.tutsplus.com/tutorials/authenticating-nodejs-applications-with-passport--cms-21619

## MySql

## PostgreSQL

## MongoDB

# Chosen Stack

**See [chat-server](chat-server.md)**

# How to model and design for this stack

**Questions that I want to answer:**

- How to create an OO model design for this system that is applicable with the chosen technology stack.
- What 'systems' do we  need to model?
- What technologies will be used, what they do, and where do they fit in the stack?
- Is modelling the same for each technology, or do some techs not support OO?
- Is it possible to design the model in a language + tech nonspecific way?
- How are webservers + front ends usually modelled?

- Dealing with multiple users:
  - SocketIO:
  ```
  io.on('connection', function(socket){
      ServerState.addUser(username,socket);
  }
  ```
  - When a user connects, store its socket. This is a unique ID for a user.
  - With a list of sockets, the users can be sent individual or broadcasted messages.
  - Users can access the database through a single point-of-access (abstracted so it seems like there is only a single database connection for the server) but have the server use a pool of database connections. Not 1-user-to-1-connection.
  - Only backend uses the database, no front-end uses via back-end intermediary.

Express MVC
https://github.com/expressjs/express/tree/master/examples/mvc
