## Endpoints

List of Available Endpoints:

- `Post / users/register`
- `Post / users/login`
- `Post / users/payment`
- `Post / payment/`

### Post /users/register

#### Description

-Create a new user

#### Request

- Headers
  ```json
  {
    "Content-type": "application/x-www-form-urlencoded"
  }
  ```
- Body
  ```json
  {
    "email":String,
    "password":String,
  }
  ```

#### Response

_201 - Created_

- Body

  ```json
  {
      "statusCode" : 201,
      "message" : "user created succesfully",
      "data":{
        "id":Integer,
        "email":String,
        },


  }
  ```

_400 - Bad Request_

- Body

  ```json
  {
      "statusCode" : 400,
      "error":{
              "message":String,
          },

  }
  ```

### Post /users/login

#### Description

-log in

#### Request

- Headers
  ```json
  {
    "Content-type": "application/x-www-form-urlencoded"
  }
  ```
- Body

  ```json
  {
    "id":String,
    "email":String,

  }
  ```

#### Response

_200 - Ok_

- Body

  ```json
  {
      "id":String,
      "statusCode" : 200,
      "access_token":String,
      "isPremium":Boolean,

  }
  ```

_400 - Bad Request_

- Body

  ```json
  {
    "statusCode": 400,
    "error": {
      "message": "Invalid email or password"
    }
  }
  ```

### Patch /users/payment

#### Description

-update premium status

#### Request

- Headers

  ```json
  {
    "access_token": "access_token"
  }
  ```

  #### Response

  _200 - Ok_

  - Body

  ```json
  {
      "statusCode" : 200,
      "message" : "membership updated succesfullly",
      "data":Object,
  }
  ```

### Post payment/

#### Description

-hit payment api

#### Request

- Headers

  ```json
  {
    "access_token": "access_token"
  }
  ```

#### Response

_200 - Ok_

- Body

  ```json
  {
    "token": token ,
    "redirect_url": url
  }
  ```

### Global Error

#### Response

401 - Unauthorized\_

```json
{
  "message": "Please Login First"
}
```

_500 - Internal Server Error_

- Body

  ```json
  {
    "statusCode": 500,
    "error": {
      "message": "Internal Server Error"
    }
  }
  ```
