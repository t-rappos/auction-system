# auction-system
[![Build Status](https://travis-ci.org/t-rappos/auction-system.svg?branch=master)](https://travis-ci.org/t-rappos/auction-system)
An auction listing system

# Table of Contents

1. Introduction
2. Development Plan
3. User Requirements
4. Technical Outline

# 1\. Introduction

The purpose of this project is to gain experience using and integrating multiple different software technologies. An auction listing system would be an appropriate candidate as it requires development of user interfaces, server back-ends and database functionality. This project will be set up for multiple collaborators but will most likely be a single developer effort.

## 1.1 What is auction-system

Users can list items (user created) on an online auction website for sale for other users to either buyout or bid on. Items listed can be filtered to highlight interesting items. Once an item is successfully purchased, it is placed in the buyers personal inventory. The user can view their own inventory and inspect each item.

See the [SRS](doc/srs.md) for more information.

## 1.2 How does it work

Basic overview of structure and functionality

See the [TDD](doc/tdd.md) or [Technologies research](doc/technologies%20research.md) for more information.

# 2\. Development Plan

## Phase 1: Setup

#### Upfront Research & Design

- Outline the scope and define user requirements (SRS)
- Research what technologies will be used
- See [Chat-Server](doc/chat-server.md) [![Build Status](https://travis-ci.org/t-rappos/auction-system.svg?branch=chat-server)](https://travis-ci.org/t-rappos/auction-system) for a throwaway prototype application using the desired technology stack
- Visit the deployment on [heroku](https://chat-server-t-rappos.herokuapp.com/#/?_k=32gzvg)
- Define system structure by documenting all classes, their roles, responsibilities and collaborators. (TDD)
- List of classes/Components w/ specs
- UML diagrams

#### Research Development workflow
- Scrum or Agile workflows
- Issues/Features/Tickets Driven Development
- Test Driven Development
- Continuous Integration
- Continuous Deployment
- Documentation
- Working Transparently
- Changing user requirements

See the [workflow.md](doc/workflow.md) for detailed workflow research and [Trello](https://trello.com/b/R9DxZCFG/auction-system) for current development plans.

#### Phase Completion
- SRS and TDD are drafted
- Then intended development workflow is outlined and development tools are setup

## Phase 2: Development

#### Workflow Automation
- Development workflow/tools are automated as much as possible and can be setup simply for collaborators.
- Standardise (development/testing/production) environments to remove all 'works of my machine' issues.
- Development commences.

#### Phase Completion
- SRS requirements are met

## Phase 3: Release

- Continue developing by completing outstanding tickets as they arrive.
- Triage tickets frequently.
