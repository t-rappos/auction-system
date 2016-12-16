# auction-system

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

See the [SRS (Section 3)](#3-srs) for more information.

## 1.2 How does it work

Basic overview of structure and functionality

See the [TDD (Section 4)](#4-technical-outline) or [Technologies research](technologies%20research.md) for more information.

# 2\. Development Plan

## Phase 1: Setup

#### Upfront Research & Design

- Outline the scope and define user requirements (SRS)
- Research what technologies will be used
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

See the [workflow.md](workflow.md) for detailed workflow research and planning

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


# 3. SRS

## 3.1 Introduction

### 3.1.1 Purpose

This document is intended to describe the user requirements for an auction listing system and will outline the users desired functionality.

### 3.1.2 Scope

This is a personal hobby project designed to provide experience working with multiple integrated systems. The goal of this project is to deliver a software solution that meets all of the user requirements product using an effective, scalable and collaborative development workflow. The software developed and technologies/workflows used are planned to be adapted for use in later projects.

## 3.2 Description

### 3.2.1 Perspective

This product will consist of a user-facing GUI with data processed and stored online.

### 3.2.2 Functions

The following is a list estimated user functionality, users can:

- Accounts
  - create an account
  - edit their account
  - message other accounts
  - see received messages
  - have associated currency amount for use
  - login
  - logout


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
  - cancel listing


- Searching
  - search for items to buy
  - wait for item to appear that matches search criteria
  - sort list of searched for items
  - view price of item type over time

### 3.2.3 Operating Environment

- Users will be able to use this software from a website GUI. It should work identically on ?Internet Explorer?, Firefox and Chrome on PC's and mobiles.
- Multiple users can use the software at any time

### 3.2.4 Domain Entities
- User-Account
- Message
- Item
  - Image
  - Tag
  - Category/Type
- Currency
- Inventory
- Inventory View
- Listing
- Bid
- Search
- Search result
- Transaction

### 3.2.5 Actors

The following are the types of users that may use this software.

- Admin / Developer
  - Will require debug or extra observational functionality.
  - R1\. View history of all sales
  - R2\. Sort history of all sales by criteria

- Frequent user
  - Knows how to use the system, wants quick and effective functionality.

- Casual user
  - Needs extra information to describe the system for usage

TODO: Expand these actors into extra requirements

### 3.2.6 List of tasks

These are the tasks that are required to be supported by the software solution.

1. Create account
2. Login
3. Logout
4. Modify account
5. View account
6. View message
7. Create message
8. Create item
9. Remove item
10. View item
11. Sort inventory
12. Search inventory
13. Sell item
14. Buy item
15. Bid on item
16. View owned listings
17. Cancel listing
18. Wait for search
19. Sort search result list
20. View price of item-type over time

### 3.2.7 CRUD Check

[CRUD spreadsheet ](https://docs.google.com/spreadsheets/d/1MRDU_9CzYix6REQ6JA-69m1cYBdSQDAedr_KkLhzpeI/edit?usp=sharing)

### 3.3 Tasks & Support
The following are descriptions of the supported user tasks. They don't explicitly outline an intended technical solution but provide a rough suggestion for the reader, as the aim is to outline the problem domain of the system (rather than the solution domain). Inspired from the whitepaper
[Task Descriptions as
Functional Requirements](http://www.itu.dk/~slauesen/Papers/IEEEtasks.pdf).

#### 3.3.1 Create Account
  - Purpose: Register the user with the system
  - Trigger/Precondition: User wants to use the system
  - Frequency: Once per user
  - Critical: N? amount per day
  - Subtasks | Solution
    1. collect user name | dialog box w/ name taken checker
    2. collect password | dialog box w/ password checker
    3. collect email | dialog box w/ email checker
    4. record account | register button
    5. notify user of successful registration | display success message
  - Variants:
    - 1a. username is taken | show error message
    - 2a. password isn't valid | ""
    - 3a. email taken | ""
    - 4a. user returns to previous page or exits | clear entered details

#### 3.3.2 Login
- Purpose: Authenticate the user and provide access to system (user session created)
- Trigger/Precondition: User-account is registered
- Frequency: Once per session per user (once per day)
- Critical: 5? times a day per user
- Subtasks | Solution
  1. Take username | dialog box w/ name taken checker
  2. Take password | dialog box w/ password checker
  3. Display homepage | Display a landing page with user account details displayed
- Variants:
  - 1a. Username is incorrect | display error "username/password incorrect"
  - 2a. Password is incorrect | display error "username/password incorrect"

#### 3.3.3 Logout
- Purpose: Cancel the users session with the system
- Trigger/Precondition: The user is logged in, User is inactive, System is restarted
- Frequency: Once per session per user (Once per day)
- Critical: 5? times a day per user
- Subtasks | Solution
  1. User signs out | User clicks a log-out button
  2. Display system login page | <--
- Variants:
  - 1a. User isn't logged in | do nothing

#### 3.3.4 Modify account
- Purpose: Change details or descriptions pertaining to the users account
- Trigger/Precondition: User has an account, User is logged in.
- Frequency: Less than 10 times per user.
- Critical: Greater than 10 times per user.
- Subtasks | Solution
  1. User selects edit profile | Clicks Menu->Account->Edit Account
  2. User selects profile attribute to edit | Selects text box
  3. User edits the selected attribute | Edits text where appropriate
  4. User confirms updating profile | Clicks "confirm changes"
  5. Displays profile page
- Variants:
  - 3a. User makes no changes | no changes are made to the account
  - 3b. User makes changes but returns to previous page instead of confirming | no changes are made to the account

#### 3.3.5 View account
- Purpose:
- Trigger/Precondition:
- Frequency:
- Critical:
- Subtasks | Solution
  1. |

- Variants:
  - 1a. |

#### 3.3.6 View message
- Purpose:
- Trigger/Precondition:
- Frequency:
- Critical:
- Subtasks | Solution
  1. |

- Variants:
  - 1a. |

#### 3.3.7 Create message
- Purpose:
- Trigger/Precondition:
- Frequency:
- Critical:
- Subtasks | Solution
  1. |

- Variants:
  - 1a. |

#### 3.3.8 Create item
- Purpose:
- Trigger/Precondition:
- Frequency:
- Critical:
- Subtasks | Solution
  1. |

- Variants:
  - 1a. |

#### 3.3.9 Remove item
- Purpose:
- Trigger/Precondition:
- Frequency:
- Critical:
- Subtasks | Solution
  1. |

- Variants:
  - 1a. |

#### 3.3.10 View item
- Purpose:
- Trigger/Precondition:
- Frequency:
- Critical:
- Subtasks | Solution
  1. |

- Variants:
  - 1a. |

#### 3.3.11 Sort inventory
- Purpose:
- Trigger/Precondition:
- Frequency:
- Critical:
- Subtasks | Solution
  1. |

- Variants:
  - 1a. |

#### 3.3.12 Search inventory
- Purpose:
- Trigger/Precondition:
- Frequency:
- Critical:
- Subtasks | Solution
  1. |

- Variants:
  - 1a. |

#### 3.3.13 Sell item
- Purpose:
- Trigger/Precondition:
- Frequency:
- Critical:
- Subtasks | Solution
  1. |

- Variants:
  - 1a. |

#### 3.3.14 Buy item
- Purpose:
- Trigger/Precondition:
- Frequency:
- Critical:
- Subtasks | Solution
  1. |

- Variants:
  - 1a. |

#### 3.3.15 Bid on item
- Purpose:
- Trigger/Precondition:
- Frequency:
- Critical:
- Subtasks | Solution
  1. |

- Variants:
  - 1a. |

#### 3.3.16 View owned listings
- Purpose:
- Trigger/Precondition:
- Frequency:
- Critical:
- Subtasks | Solution
  1. |

- Variants:
  - 1a. |

#### 3.3.17 Cancel listing
- Purpose:
- Trigger/Precondition:
- Frequency:
- Critical:
- Subtasks | Solution
  1. |

- Variants:
  - 1a. |

#### 3.3.18 Wait for search
- Purpose:
- Trigger/Precondition:
- Frequency:
- Critical:
- Subtasks | Solution
  1. |

- Variants:
  - 1a. |

#### 3.3.19 Sort search result list
- Purpose:
- Trigger/Precondition:
- Frequency:
- Critical:
- Subtasks | Solution
  1. |

- Variants:
  - 1a. |

#### 3.3.20 View price of item-type over time
- Purpose:
- Trigger/Precondition:
- Frequency:
- Critical:
- Subtasks | Solution
  1. |

- Variants:
  - 1a. |

### 3.4 Domain Model

### 3.5 Design and Implementation Constraints / Assumptions

- Security issues can be ignored due to trivial nature of software, user account should be designed to be replaced by a secure system after this project is complete.
- User account verification can be ignored since this is a prototypical live website

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

# 4\. Technical Outline
