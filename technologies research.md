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

- needs test driven development

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

### Back Ends
A  list of technologies used to create server functionality

### Authentication

Passport (NodeJS)

### Database Storage

tutorial about handling multiple users
https://codeforgeek.com/2015/01/nodejs-mysql-tutorial/

# In Detail

Further explanation about each technology

## Node JS

- *What does it do?*
- *Where does it fit in the stack?*
- *What is it usually used for?*

## Java/Spring

- *What does it do?*
- *Where does it fit in the stack?*
- *What is it usually used for?*

## React

- *What does it do?*
- *Where does it fit in the stack?*
- *What is it usually used for?*

## Express

- *What does it do?*
- *Where does it fit in the stack?*
- *What is it usually used for?*

## Redux

- *What does it do?*
- *Where does it fit in the stack?*
- *What is it usually used for?*



https://spring.io/guides/tutorials/react-and-spring-data-rest/

## nodejs Passport
  - https://code.tutsplus.com/tutorials/authenticating-nodejs-applications-with-passport--cms-21619

## MySql

## PostgreSQL

# Chosen Stack


# How to model and design for this stack

**Questions that I want to answer:**

- How to create an OO model design for this system that is applicable with the chosen technology stack.
- What 'systems' do we  need to model?
- What technologies will be used, what they do, and where do they fit in the stack?
- Is modelling the same for each technology, or do some techs not support OO?
- Is it possible to design the model in a language + tech nonspecific way?
- How are webservers + front ends usually modelled?
