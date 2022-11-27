# Centennial web final Project
## Survey site

- [Stack technologies](#stack)
- [Api requests](#api)

## Stack

**Backend**
- Express
- jsonwebtoken

**Front-end**
- Webpack
- SCSS
- JS
- Nginx (web server)

**Database**
- MongoDB 6.0.2

## Api

**Deployment**
- Docker
- Docker-compose

**ID MUST BE MONGODB ObjectId**

### User requests

**Creating a new user**  
`POST:`  `/api/users/register`

```json
{
  "login": "testUser5",
  "password": "test1234"
}
```

<hr>

**Log in**  
`POST:`  `/api/users/login`

```json
{
  "login": "testUser5",
  "password": "test1234"
}
```

Returning a `token` for further API usage

### Survey requests

**Creating a new survey**
`POST:`  `/api/survey/create`  
Body json request:

```json
{
  "token": "...eyj6s6mSolD32kXbefBA",
  "topic": "A new topic of the survey",
  "inquirer": [
    {
      "question": "Question 1",
      "answers": [
        "option 1",
        "option 2",
        "option 3"
      ]
    },
    {
      "question": "Question 2",
      "answers": [
        "option 1",
        "option 2",
        "option 3"
      ]
    },
    {
      "question": "Question 3",
      "answers": [
        "option 1",
        "option 2",
        "option 3"
      ]
    }
  ]
}
```

<hr>

**Getting all surveys**
`POST:`  `/api/survey/getall`  
Requires an empty body. Expected JSON response
<hr>

**Getting survey by id**  
`POST:`  `/api/survey/get/:id`  
Example: `http://localhost:3000/api/survey/get/63699270d4ab440bfe8a578a`  
Requires an empty body. Expected JSON response
<hr>

**Removing survey by id**  
`POST:` `/api/survey/remove/:id`  
Example: `http://localhost:3000/api/survey/remove/636ebcd7439e14d84d154873`  
Body json request:

```json
{
  "token": "...eyj6s6mSolD32kXbefBA"
}
```

<hr>  

**Getting inquirer by inquirer id**  
`POST:`  `/api/survey/inquirer/:id`  
Example: `http://localhost:3000/api/survey/inquirer/63692b8dda87c344d03dae3a`  
Requires an empty body. Expected JSON response
<hr>

**Updating inquirer fields by survey and inquirer ids**  
`POST:` `/api/survey/get/:surveyID/update/inquirer/:inquirerID`  
Example: `http://localhost:3000/api/survey/get/63692b8dda87c344d03dae3d/update/inquirer/63692b8dda87c344d03dae3a`  
Body json request:

```json
{
  "token": "...eyj6s6mSolD32kXbefBA",
  "inquirer": {
    "question": "New question",
    "answers": [
      "1",
      "2",
      "3"
    ]
  }
}
```

<hr>

**Deleting inquirer field by survey and inquirer ids**  
`POST:` `/api/survey/get/:surveyID/delete/inquirer/:inquirerID`  
Example: `http://localhost:3000/api/survey/get/63692b8dda87c344d03dae3d/delete/inquirer/63692b8dda87c344d03dae3b`  
Body json request:

```json
{
  "token": "...eyj6s6mSolD32kXbefBA"
}
 ```