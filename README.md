# FULL-STACK WEB TO-DO-LIST

## Latest Updates

- [x] User can now login/register
- [x] User can view their dashboard and perfom actions
- [x] User can now view profile
- [ ] deploy to heroku

## Known Bugs

## Description

- Simple To-do-list app which user can create account and save their tasks daily

## Tech

1. frontend

- ReactJs, Redux

2. backend

- ExpressJs

3. database

- ~~SQLite~~
- PostgreSQL (heroku deploy)
- KnexJs

## Folder structure

1. general

```bash
.
├── AUTHOR.txt
├── client
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   ├── App.css
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── README.md
│   └── src
│       ├── actions
│       │   ├── alert.js
│       │   ├── auth.js
│       │   ├── dashboard.js
│       │   ├── set_token.js
│       │   └── types.js
│       ├── App.js
│       ├── components
│       │   ├── auth
│       │   │   ├── Login.js
│       │   │   └── Register.js
│       │   ├── Home.js
│       │   ├── layout
│       │   │   ├── Alert.js
│       │   │   ├── DragItem.js
│       │   │   ├── form.js
│       │   │   ├── Guide.js
│       │   │   ├── Navbar.js
│       │   │   ├── NotFound.js
│       │   │   └── Spinner.js
│       │   ├── main
│       │   │   ├── Dashboard.js
│       │   │   ├── DelForm.js
│       │   │   ├── EditForm.js
│       │   │   ├── EditTagForm.js
│       │   │   ├── Kanban.js
│       │   │   ├── MyRoutes.js
│       │   │   ├── PrivateRoutes.js
│       │   │   ├── Tag.js
│       │   │   ├── TagForm.js
│       │   │   ├── Task.js
│       │   │   └── TaskForm.js
│       │   └── profile
│       │       └── Profile.js
│       ├── css
│       │   ├── app.css
│       │   ├── auth.css
│       │   ├── dashboard.css
│       │   ├── form.css
│       │   ├── index.css
│       │   ├── kanban.css
│       │   ├── mobile-version.css
│       │   └── profile.css
│       ├── img
│       │   ├── alarm.PNG
│       │   ├── kanban.PNG
│       │   ├── kanban-2.PNG
│       │   ├── marked.PNG
│       │   ├── normal.PNG
│       │   ├── tagadd.PNG
│       │   ├── tags.PNG
│       │   ├── task.PNG
│       │   ├── taskform.PNG
│       │   └── view.PNG
│       ├── index.js
│       ├── reducers
│       │   ├── alert.js
│       │   ├── auth.js
│       │   ├── dashboard.js
│       │   ├── home.js
│       │   └── index.js
│       ├── reportWebVitals.js
│       ├── setupTests.js
│       └── store.js
├── index.js
├── knexfile.js
├── middleware/
│   └── auth.js
├── package.json
├── package-lock.json
├── README.md
├── routes/
│   ├── list.js
│   ├── tag.js
│   └── user.js
└── sql/
    ├── db-config.js
    ├── knex.js
    ├── migrations
    ├── mydata.db
    ├── mydata.sql
    └── seeds

```

## Setup

> at root directory

```
    npm run dev # this run both backend + frontend in you local machine
```

> docker container run

```
    # I will update this asap
```

## Deployment

> Currently, this hasn't worked as expected yet, I'm switching to postgres

- Heroku - please kindly check this [url](http://to-do-list-herku.herokuapp.com/)

# Author

- yen tran - [portfolio](http://portfolio-herku.herokuapp.com/)

# Licenses

MIT
