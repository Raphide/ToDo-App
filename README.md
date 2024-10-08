# Todo Application - Front End

![Todo application](./src/assets/todo.png)

---

## Requirements / Purpose

### purpose of project

- The task is to create an application that allows you to track, add, and delete tasks as well as manage categories of tasks.

### MVP

- Must be able to add categories
- Must be able to add new tasks tagged with a task category
- Must be able to update tasks automatically by changing the task name and the category
- Must be able to duplicate tasks
- Must be able to delete tasks
- You must add your own styling

### stack used

- Vite React
- TypeScript
- CSS/SCSS
- HTML

---

## Build Steps

- Clone repository and run "npm install" to install dependencies.
- This Application runs alongside the <a href="https://github.com/Raphide/ToDo-API">Todo Application- Back End</a>

---

## Design Goals / Approach

- I wanted to make something that was visually basic, but not stylistically basic.
  - to achieve this I have taken quite a lot of inspiration and guidance from Google's <a>https://m3.material.io/</a>
- I want the UI to be intuitive and accessable to almost all users. This goal isn't complete yet in terms of accessibility features but it is being worked on.

---

## Features

- New tasks can be created
  - New categories can also be created
- Tasks can be edited
- Tasks can be deleted 
- Tasks are given a priority which is reflected by the colour of the tops of the cards
- Tasks can be marked off as completed and are archived
- Tasks can be filtered by Category/Priority

---

## Known issues

- Filtering of tasks by category takes them out of order of priority
- Feature to count total Tasks completed not yet working correctly
  - State is not yet stored anywhere to track this so it resets after every page reload
  - Decided to remove this feature for now (03/09/2024)

---

## Future Goals

- Ability to drag and drop task cards to create your own ordered list of tasks
- Creating a deadline feature to Tasks
- Accessability features and options
  - Light/Dark Mode
  - Alt text
- Fixes to the way the Task Cards are sorted by priority

---

## Change logs

### 03/09/2024 - Fixed error handling and add category bug

- Fixed issue where form would reset instead of handling errors when some fields were left empty
- Fixed issue where newly created category would not appear in the drop down selection until after an initial selection was made

### 02/09/2024 - Added final MVP features

- Fixed button styling on the cards
- Improved header styling
- Created a style for completed task cards
- removed feature to count total completed tasks for the time being

### 01/09/2024 - Added final MVP features/Various changes to the Task Page

- Added Duplication and Archive functions in services
- Added Duplication and Archive buttons on Task Cards
  - Need to fix button styling for these
- Improved some basic styling and fixed the app being off-center
- Added the ability to switch between completed and active tasks
- this is currently presented as being "Archived", but that is to be a seperate feature to be added soon.
- Added a proper README and changelog :D 

---

## What did you struggle with?

- Rendering Task Cards in order of priority. Currently the workaround is a bit janky and could be implemented better.

---

<!-- ## Licensing Details

- What type of license are you releasing this under?

--- -->

## Further details, related projects, reimplementations

- This Front-End has an accompanying Back-End API <a>https://github.com/Raphide/ToDo-API</a>
