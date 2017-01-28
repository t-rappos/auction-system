
# Workflow research

The following are features of the intended development workflow

## 1. Setup and Design

#### Planning (Trello?)

- Outline the scope and define user requirements (SRS)
- Research what technologies will be used

#### Design (LucidCharts?)

- User guide (user UI)
- Define system structure by documenting all classes, their roles, responsibilities and collaborators.  (TDD)
- List of classes/Components w/ specs
- UML diagrams
- Throwaway tech demos to explore software
  - a 'chat-server' webpage

## 2. Development

- Follow scrum / agile
  - have a list of features / implementation tickets
  - push some onto a weekly sprint list
  - work off sprint list
  - once complete push ticket onto drafted list (& link github commit)
  - then once documented push onto documented list
  - then once peer reviewed (+3 votes) push onto the completed list

#### Issues/Features/Tickets - (Trac?, Github)

- Development will be conducted by completing tickets
- Design speciification will be broken down into issues
  - Ensure that tickets are linked to specs
  - Tests will be specified as issues as well
  - Are github pull requests overkill for single person projects? (yes)
  - If this becomes a multi-developer project, use Trello + Slack to delegate issues as tasks?
  - New features will be designed as tickets, where they will serve as documentation explaining the features
  - Traceability - Discuss this
    - tickets created from specs should quote reference #'s  
  - (interesting) In a multi-developer project, any work conducted must be from a ticket, users can make tickets, but can't work on tickets they make

#### Testing

- Tests should be written before actual code (unit tests)
  - Test public API and focus on behaviour over implementation details
  - This is difficult with javascript since you need to know the structure of the resultant HTML to be able to test DOM elements
  - Although it is possible for unit testing non-DOM effecting methods
  - Testing client-server interaction will have to be done
  - Also testing front-end react-redux component state will have to be done
- User tasks should be tested as well (Acceptance testing? Integration testing?)
  - Do we want to do manual testing before each production update release
  - Can we automate this?
- Aiming for high test coverage 90%+ should be a requirement for successful build
- Static analysis tests (Linting ESLint)
- Tests should be tiered and parrellelised
- User Functionality tests should be targeted to different platform(firefox, chrome)

#### Continuous Integration

- All code must always compile and past tests
  - Should this be just master branch, release branch or all branches?
    - All remote branches (to be safe)
  - Should it have to pass CI tests for a push to github to occur?
    - Force pull request functionality
  - Travis-CI can be used to run tests (NPM install, NPM test) and then signals the OK to the deployment server (Heroku) for deployment
- Automate to remove 'Works on my machine' issues, allowing for simple collaboration

#### Continuous Deployment

- No/Minimal System downtime
- Deployed (Release/Staging?) version always reflects the current state of the code base (master branch)
- Pushes to github will instigate CI test and if successful, deployment to host
- Automatic deployment to staging then from staging->release environments
  - two hosts, one host for staging env, one for production. (two different GIT branches staging,master)
  - pushes to staging -> deploy to staging  (a new feature is developed, pushed to staging for testing)
  - pushes to master -> deploy to production (feature confirmed functional + tests passing)
  -

#### TODO: GIT workflow

#### Documentation

- Documentation should be completed such that there is **NO repeated or duplicate ideas/definitions.**
- Documentation should be completed prior to work being conducted, as a Plan or design specification (tickets). There should be minimal after the fact documenting.
- After a ticket is completed it must be linked to the git code and documented somewhere before the ticket is ready for peer-review and completion.
-
- Changelog...

#### Versioning

(Consumer facing)

A.B.C

- (A) Version incompatabilities
- (B) Major changes and features
- (C) Minor fixes and patches

(development facing)

N

- (N) Linked to github, most recent commit that is deployed??

(final e.g.)

3.12.52 (#2312)

#### Work Transparently

- All work performed and current state of working should be available to other collaborators to view
  - work including and not limited to:
    - research/planning/designing/documenting/developing/testing/configuring
  - work should be performed in documents within the repository
  - work should be performed as required by tickets beforehand
  - once completed, the completed work must be linked to the instigating ticket
  - time-consuming research should be ticketed
  - should be working off of a (visible) sprint list
- In progress product should always be visible to client (CI & CD)

#### Changing user requirements

  - Specification documentation should be highly traceable so that new specs can be added and removed from all documentation easily

#### Throwaway prototyping

  - A simple prototype should be completed to research technologies/workflow to be used.

## Phases
### Phase 1 - Setup
- Research workflow
- Complete requirements spec (SRS)
- Complete design spec (TDD)

### Phase 2 - Development
- Automate and standardise environments
- Start development following tickets

### Phase 3 - Release
- SRS requirements are met
- Continue developing following outstanding tickets as they arrise
