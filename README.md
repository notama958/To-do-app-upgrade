# tamk-5G00DM05-3001

## Nodejs backend project with SQLite

[Entity UML](https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1&title=fullstack-api-todo.drawio#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D10tDVt0ZOSd6wdntmWXeqwtiQMGM1rJK2%26export%3Ddownload)

1. Setup

```
    cd      ./project/sql/
    sqlite3 mydata.db --init .sqliterc
    .read   mydata.sql
```

```
    cd project
    npm install
    npm run dev # running at port 5555
```

2. API endpoints

- USER:
  - POST https://localhost:5555/api/users/login (headers:{'x-auth-token':<token>}) - login with email and password
  - POST https://localhost:5555/api/users/register (data:{"email":"xxxx", "password":"xxxxxxx", username:"xzxxx"}) - register with email and password
  - GET https://localhost:5555/api/users/ (headers:{'x-auth-token':<token>}) - get information of the user
- TAG:
  - GET http://localhost:5555/api/tag/ (headers:{'x-auth-token':<token>}) - get tags made by the user
  - POST http://localhost:5555/api/tag/ (headers:{'x-auth-token':<token>}) + (data:{"tagname":"xxxx"}) - add a new tag made by the user
  - PUT http://localhost:5555/api/tag/ (headers:{'x-auth-token':<token>}) + (data:{"tagname":"xxxx"}) - modify a tag made by the user
  - DELETE http://localhost:5555/api/tag/:id (headers:{'x-auth-token':<token>}) - delete a tag made by the user
  - GET http://localhost:5555/api/list/all/tag (testing only)
- TASK:
  - GET http://localhost:5555/api/list/ (headers:{'x-auth-token':<token>}) - get tasks made by the user
  - POST http://localhost:5555/api/list/ (headers:{'x-auth-token':<token>}) + (data:
    { "desc":"tester-added-10000",
    "status":1,
    "created":"2021-11-20",
    "alarm":null,
    "tag_id":233,
    }) - add a new task made by the user
  - PUT http://localhost:5555/api/list/ (headers:{'x-auth-token':<token>}) + (data:
    { "desc":"tester-added-10000",
    "status":1,
    "created":"2021-11-20",
    "alarm":null,
    "tag_id":233,
    }) - modify a task made by the user
  - DELETE http://localhost:5555/api/list/:id (headers:{'x-auth-token':<token>}) - delete a task made by the user
  - GET http://localhost:5555/api/list?tag_id=XXX&order=asc (headers:{'x-auth-token':<token>}) - filter tasks based on tag id and sort by time created
  - GET http://localhost:5555/api/list/all/task (testing only)
