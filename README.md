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
 - Define system structure by documenting all classes, their roles, responsibilities and collaborators.
 - List of classes/Components w/ specs
 - UML diagrams

### Development

- Follow scrum / agile

##### Issues/Features/Tickets - (Trac?, Github)
 - Development will be conducted by completing tickets
 - Design speciification will be broken down into issues
   - Ensure that tickets are linked to specs
  - Tests will be specified as issues as well
  - Are github pull requests overkill for single person projects?
  - If this becomes a multi-developer project, use Trello + Slack to delegate
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
  - Deployed (Release/Staging?) version always reflects the current state of the code base (master branch)

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
  - 3.x.. Development subtasks here

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

This is a personal hobby project designed to provide experience working with multiple integrated systems. The goal of this project is to deliver a software solution that meets all of the user requirements product using an effective, scalable and collaborative development workflow. The software developed and technologies/workflows used are planned to be adapted for use in later projects.

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
 - can be of a type/category/tag
- Listings
 - sell and buy items
 - auction and bid on items
 - sold items trigger a 'item sold' message to be sent to the seller
- Searching
 - search for items to buy
 - wait for item to appear that matches search criteria
 - sort list of searched for items
 - view price of item type over time

### 3.2.3 Actors
The following are the types of users that may use this software.
- Admin / Developer
  - Will require debug or extra observational functionality.
  - R1. View history of all sales
  - R2. Sort history of all sales by criteria
- Frequent user
  - Knows how to use the system, wants quick and effective functionality.
- Casual user
  - Needs extra information to describe the system for usage

TODO: Expand these actors into extra requirements

### 3.2.4 Operating Environment

Users will be able to use this software from a website GUI. It should work identically on ?Internet Explorer?, Firefox and Chrome on PC's and mobiles.

### 3.2.5 Design and Implementation Constraints / Assumptions

Security issues can be ignored due to trivial nature of software, user account should be designed to be replaced by a secure system after this project is complete.

## 3.3 User Interfaces
### 3.3.1 Sign-up
### 3.3.2 Account Home
### 3.3.3 Edit account
### 3.3.4 Send message
### 3.3.5 View messages
### 3.3.6 View individual message
### 3.3.7 Create Item
### 3.3.8 View items
### 3.3.9 View individual item
### 3.3.10 List item
### 3.3.11 Search for item
### 3.3.12 View item price over time
### 3.3.13 View history of all sales
### 3.3.14 Log-in

## 3.4 System Features
### 3.4.1 Feature 1
#### Short description + Priority
#### Use Case
#### Requirements
##### SREQ-1
##### SREQ-2
...

## 3.5 Non-functional Requirements
### 3.5.1 Performance
- Less than 500ms delay for all interface interactions except searching

### 3.5.2 Safety
- Store least amount of required personal user information

### 3.5.3 Usability
- Feedback for all user interface interactions
- Text input dialogs should show autocomplete recommendations where possible
- Useability test (for each requirement/task) must be completed before website goes live

### 3.5.4 Software Quality


# 4. Technical Outline
