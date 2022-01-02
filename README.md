# FULL-STACK WEB TO-DO-LIST

## Known Bugs

- [x] ~~cannnot add with button (task +)~~
- [x] ~~sort tasks didn't work~~
- [ ] delete account didnt work
- [ ] delete tags didn't work
- [x] ~~missing the return to dashboard arrow from kanban view~~

## Description

- Simple To-do-list app which user can create account and save their tasks daily

## Tech

1. frontend

- ReactJs, Redux

2. backend

- ExpressJs

3. database

- SQLite (for local run)
- PostgreSQL (for heroku deploy)
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
> in the local run I used the SQLite3, thus you should have a database file fed with **./sql/mydata.sql** placed in the **./sql** folder initially

```bash
    # in cygwin
    sqlite3 --init .sqliterc mydata.db
    # inside sqlite shell
    sqlite> .read mydata.sql
    # copy the local database file to app directory
    cp -R mydata.db ./<name_of_the_app>/sql/
```

```
    cd <name_of_the_app> # root directory
    npm i # install dependencies
    npm run dev # this run both backend + frontend in you local machine
```

> postgreSQL in heroku

- it's running as a separate add-ons to the heroku project, I fed it with predefined schema + data in the **./sql/mydata-psql.sql**

```bash
    # since the postgres heroku is sharable between different projects
    heroku addons:attach <name_of_your_postgres_db_on_heroku> --app <the_app_you_want_to_add>
    heroku pg:psql <name_of_your_postgres_db_on_heroku>  <  <your_sql_file> # for windows terminal double quote your < ==>> "<"
```

## Deployment

> Some bugs are remainning, I will update notices in **Known Bugs**

- Heroku - please kindly check this [http://to-do-list-herku.herokuapp.com/](http://to-do-list-herku.herokuapp.com/)

# Author

- yen tran - [portfolio](http://portfolio-herku.herokuapp.com/)

# Licenses

MIT
