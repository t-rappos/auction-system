# auction-system
An auction listing system

# Table of Contents
1. Introduction
2. Development Plan
3. User Requirements
4. Technical Outline

# 1. Introduction
The purpose of this project is to gain experience using and integrating multiple different software technologies. An auction listing system would be an appropriate candidate as it requires development of user interfaces, server back-ends and database functionality. This project will be set up for multiple collaborators but will most likely be a single developer effort.

## 1.1 What is auction-system
Basic overview of user features

## 1.2 How does it work
Basic overview of structure and functionality

# 2. Development Plan
## Phase 1:
Research into what development workflow is needed
The following are features of the intended development workflow

### Setup and Design
##### Planning (Trello?)

 - Outline the scope and define user requirements
 - Research what technologies will be used
   - React/NodeJS (UI)
   - PostgreSql (DB)
   - Java/Spring (Server)

##### Design (LucidCharts?)
 - Define system structure by documenting all classes, thier roles, responsibilities and collaborators.
 - List of classes/Components w/ specs
 - UML diagrams

### Development

- Follow scrum / agile

##### Issues/Features/Tickets - (Trac?, Github)
 - Development will be conducted by completing tickets
 - Design specicification will be broken down into issues
   - Ensure that tickets are linked to specs
  - Tests will be specified as issues as well
  - Are github pull requests overkill for single person projects?
  - If this becomes a multi-developer project, use Trello + Slack tdelegate
  issues as tasks?
  - New features will be designed as tickets, where they will serve as documentation explaining the features
  - Traceability - Discuss this

##### Testing
  - Tests should be written before actual code
  - Aiming for high test coverage
    90%+ should be a requirement for successful build
  - Static analysis tests
  - Tests should be tiered
  - User Functionality tests should be targeted to different platform(firefox, chrome)

##### Continuous Integration
  - All code must always compile and past tests
    Should this be just master branch, release branch or all branches?
  - Automate to remove 'Works on my machine' issues, allowing for simple collaboration

##### Continuous Deployment
  - No/Minimal System downtime
  - Deployed (Release/Staging?) version always reflects the currenstate of the code base (master branch)

##### Documentation
  - Documentation should be completed prior to work being conducted,
  as a Plan or design specification (tickets). There should be minimal after
  the fact documenting.

##### Work Transparently
  - All work performed and current state of working should be available to other collaborators to view
    - Research information
    - Current task list

##### Changing user requirements

## Phase 2: Prototype workflow
  - 2.1 Research and Design are being worked on
  - 2.2 Development workflow is ready and development tools are setup

## Phase 3: Finalised workflow + Development
  - 2.1 (Completed) Research and Design are completed
  - 2.2 (Completed) Development workflow/tools are automated and can be setup simply for collaborators
  - 3. Development is being conducted using proper tools and workflow
  - 3.x.. Devlopment subtasks here

## Phase 4: Release
  - 3.  All user requirements are satisfied, keep developing whilst following tickets.
  - 3.x Wait for tickets / feature requests
  - 4.2 Triage currently existing tickets

# 3. User Requirements - SRS
using template from http://www.csse.monash.edu.au/~sitar/CSE4002/Lectures/srs_template-1.doc

## 3.1 Introduction
### 3.1.1 Purpose

This document is intended to describe the user requirements for an auction listing system and will outline the users desired functionality.

### 3.1.2 Scope

This is a personal hobby project designed to provide experience working with multiple integrated systems. The goal of this project is to deliver a software solution that meets all of the user requirements product using an effective, scaleable and collaborative development workflow. The software developed and technologies/workflows used are planned to be adapted for use in later projects.

## 3.2 Description
### 3.2.1 Perspective

This product will consist of a user-facing GUI with data processed and stored online.

### 3.2.2 Functions

The following is a list intended user functionality, users can:
- Accounts
 - create an account
 - edit thier account
 - message other accounts
 - see recieved messages
 - have associated currency amount for use
- Items
 - create items
 - view store items
 - sort stored items
 - see what items look like
 - can be catorgorised/tagged
- Listings
 - sell and buy items
 - auction and bid on items
- Searching
 - search for items to buy
 - sort list of searched for items


### 3.2.3 Operating Environment

Users will be able to use this software from a website GUI. It should work identically on ?Internet Explorer?, Firefox and Chrome on PC's and mobiles.

### 3.2.4 Design and Implementation Constraints



### 3.2.5 Assumptions

- Security issues can be ignored due to trival nature of software, user account should be designed to be replaced by a secure system after this project is complete.



# 4. Technical Outline
