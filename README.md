# centennial web final Project

Survey site

- [Stack technologies](#stack)
- [Api requests](#api)

## Stack
**Developing**
- Express
- Webpack
- SCSS

**Deployment**
- Docker

## Api

**Creating a new user**  
`POST:`  `/api/users/register`

```json
{
  "login": "testUser5",
  "password": "test1234"
}
```

**Log in**  
`POST:`  `/api/users/login`

```json
{
  "login": "testUser5",
  "password": "test1234"
}
```

**Creating a new survey**
`POST:`  `/api/survey/create`

```json
{
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

**Getting all surveys**
`POST:`  `/api/survey/getall`  
Requires an empty body. Expected JSON response  

**Getting survey by id**
`POST:`  `/api/survey/get/:id`  
**ID MUST BE MONGODB ObjectId**  
Requires an empty body. Expected JSON response  