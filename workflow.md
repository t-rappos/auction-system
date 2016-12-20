
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

## 2. Development

- Follow scrum / agile


The folowing sections will be refined after Phase 1.
#### Issues/Features/Tickets - (Trac?, Github)

- Development will be conducted by completing tickets
- Design speciification will be broken down into issues
  - Ensure that tickets are linked to specs
  - Tests will be specified as issues as well
  - Are github pull requests overkill for single person projects?
  - If this becomes a multi-developer project, use Trello + Slack to delegate issues as tasks?
  - New features will be designed as tickets, where they will serve as documentation explaining the features
  - Traceability - Discuss this

#### Testing

- Tests should be written before actual code (unit tests)
- User tasks should be tested as well (Acceptance testing? Integration testing?)
  - Do we want to do manual testing before each production update release
  - Can we automate this?
- Aiming for high test coverage 90%+ should be a requirement for successful build
- Static analysis tests
- Tests should be tiered
- User Functionality tests should be targeted to different platform(firefox, chrome)

#### Continuous Integration

- All code must always compile and past tests Should this be just master branch, release branch or all branches?
- Automate to remove 'Works on my machine' issues, allowing for simple collaboration

#### Continuous Deployment

- No/Minimal System downtime
- Deployed (Release/Staging?) version always reflects the current state of the code base (master branch)

#### Documentation

- Documentation should be completed prior to work being conducted, as a Plan or design specification (tickets). There should be minimal after the fact documenting.
- Changelog...

#### Work Transparently

- All work performed and current state of working should be available to other collaborators to view

  - Research information
  - Current task list

#### Changing user requirements
#### Throwaway prototyping

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
