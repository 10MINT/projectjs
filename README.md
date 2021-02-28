# projectjs
A framework for project/workspace centered web applications, written in NodeJS

![stability-wip](https://img.shields.io/badge/stability-work_in_progress-lightgrey.svg)

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/10MINT/projectjs/tree/develop)

## What
projectjs is a starting template for web applications that require user projects. 
A project can be anything, if yours is saved as a string, you can start right away.
A login screen and projects overview is already  implemented.

## Why
I figured that many services are centered around the idea of user projects, but I 
couldn't find a template to start with. So I made one myself!

## How
The project is currently written in Express with Mongoose as the DB driver and PassportJS 
as login manager. Install all dependencies with `node install`. Add your configuration in a 
dotenv file and run `node server` to run the application. A configuration template is 
provided in [example-dotenv](example-dotenv)

## To-Do
- Add other log in options
- Add other databases (FaunaDB, Firestore, SQL, etc.)
- Add other token options (JWT)
- Add group/organization schema
- Simplify: Remove dependencies

If you have developed a similar project using a different technology stack, 
please [write me an email📧](mailto:redpandadevs@gmail.com), so I can link your project here

## Technical Details
Note: I am currently working on a version that uses Bootstrap 5 and TypeORM to reduce complexity and increase modularity
- Backend: Express
- DB Driver: Mongoose
- Authentication: PassportJS
- Template Engine: EJS
- Frontend: Bootstrap 4 + List.js
- Project Schema
  - name: project name (String)
  - description: String that appears in the project card
  - content: String (change as you like)
  - owner: User
  - public: true or false
  - readAccess: array of users with read access
  - writeAccess: array of users with write access
