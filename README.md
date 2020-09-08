# projectjs
A framework for project/workspace centered web applications, written in NodeJS

![stability-wip](https://img.shields.io/badge/stability-work_in_progress-lightgrey.svg)

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/10MINT/projectjs/)

## What
projectjs is a starting template for web applications that require user projects. 
A project can be anything, if yours is 

## Why
I figured that many services are centered around the idea of user projects, but I 
couldn't find a template to start with. So I made one myself!

## How
The project is currently written in Express with Mongoose as the DB driver and PassportJS 
as login manager. Add your configuration in a dotenv file and run `node server` to run the 
application. <details><summary>Example configuration</summary><p>
```
# General settings
APP_NAME="Generic Project App"
DATABASE="mongodb"
PORT=5000
DEVELOPMENT_URL="localhost"
PRODUCTION_URL=""

# Database keys
MONGODB_PWD=""
MONGODB_URL=""
MONGODB_USER=""

# Passport keys
GOOGLE_ID=""
GOOGLE_SECRET=""
GITHUB_ID=""
GITHUB_SECRET=""
FACEBOOK_ID=""
FACEBOOK_SECRET=""
TWITTER_ID=""
TWITTER_SECRET=""
```
</p></details>

## To-Do
- Add other log in options
- Add sorting options for projects (name, last access, creation date)
- Add other databases (FaunaDB, Firestore, SQL, etc.)
- Add other token options (JWT)
- Simplify: Remove dependencies

If you have developed a similar project using a different technology stack, 
please [write me an email📧](mailto:redpandadevs@gmail.com), so I can link your project here