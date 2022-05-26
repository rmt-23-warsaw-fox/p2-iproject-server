# Endpoints
List of available Endpoints:
- `POST /participants/login`
- `POST /participants/register`
- `POST /organizers/register`
- `POST /organizers/login`
- `GET /organizers/`
- `GET /participants/`
- `PUT /participants/join/:id`
- `GET /generators/jokes`

### POST /participants/login
- Login as a participant
- Header
  ```json
  {
    "Content-type": "application/x-www-form-urlencoded"
  }
  ```
- Body
  ```json
  {
    "email":string,
    "password":string
  }
### Response
_200 - OK_
  ```json
  {
    "id":integer,
    "name":string,
    "email":string,
    "eventId":integer,
    "access_token":string
  }
_400 - Bad Request_
  ```json
  {
    "error":string
  }
  ```
_500 - Global Error_
  ```json
  {
    "error":string
  }
  ```


### POST /participants/register
- Register a new participant
- Header
  ```json
  {
    "Content-type": "application/x-www-form-urlencoded"
  }
  ```
- Body
  ```json
  {
    "name":string,
    "email":string,
    "password":string
  }
### Response
_200 - OK_
  ```json
  {
    "id":integer,
    "name":string,
    "email":string,
  }
_400 - Bad Request_
  ```json
  {
    "error":string
  }
  ```
_401 - Invalid email/password_
  ```json
  {
    "error":string
  }
  ```
_402 - Invalid token_
  ```json
  {
    "error":string
  }
  ```
_500 - Global Error_
  ```json
  {
    "error":string
  }
  ```

### POST /organizers/register
- Register a new organizer
- Header
  ```json
  {
    "Content-type": "application/x-www-form-urlencoded"
  }
  ```
- Body
  ```json
  {
    "name":string,
    "email":string,
    "password":string
  }
### Response
_200 - OK_
  ```json
  {
    "id":integer,
    "name":string,
    "email":string,
  }
_400 - Bad Request_
  ```json
  {
    "error":string
  }
  ```
_401 - Invalid email/password_
  ```json
  {
    "error":string
  }
  ```
_402 - Invalid token_
  ```json
  {
    "error":string
  }
  ```
_500 - Global Error_
  ```json
  {
    "error":string
  }
  ```

### POST /organizers/login
- Login as an organizer
- Header
  ```json
  {
    "Content-type": "application/x-www-form-urlencoded"
  }
  ```
- Body
  ```json
  {
    "email":string,
    "password":string
  }
### Response
_200 - OK_
  ```json
  {
    "id":integer,
    "name":string,
    "email":string,
    "eventId":integer,
    "access_token":string
  }
_400 - Bad Request_
  ```json
  {
    "error":string
  }
  ```
_500 - Global Error_
  ```json
  {
    "error":string
  }
  ```

### GET /organizers/
- Get all organizer data
### Response
- Body
  ```json
  [
    {
      "id":integer,
      "name":string,
      "email":string,
    },
    ...
  ]
  ```
_500 - Global Error_
  ```json
  {
    "error":string
  }
  ```

### GET /participants
- Get participants with corresponding organizer id

- Header
  ```json
  {
    "access_token":string
  }

### Response
_200 - OK_
  ```json
  [
    {
      "id":integer,
      "name":string,
      "email":string,
      "eventId":integer
    },
    ...
  ]
  ```
_400 - Bad Request_
  ```json
  {
    "error":string
  }
  ```
_403 - Invalid Token_
  ```json
  {
    "error":string
  }
  ```
_404 - Not Found_
  ```json
  {
    "error":string
  }
  ```
_500 - Global error_
  ```json
  {
    "error":string
  }
  ```

### PUT /participants/join/:id
- Update participant's event id to corresponding id of organizer of an event

- Header
  ```json
  {
    "access_token":string
  }

### Response
_200 - OK_
  ```json
  [
    {
      "message":string
    }
  ]
  ```
_400 - Bad Request_
  ```json
  {
    "error":string
  }
  ```
_403 - Invalid Token_
  ```json
  {
    "error":string
  }
  ```
_404 - Not Found_
  ```json
  {
    "error":string
  }
  ```
_500 - Global error_
  ```json
  {
    "error":string
  }
  ```

### GET /generators/jokes
- Get a random dad joke from a public third-party [API]("https://icanhazdadjoke.com/")

- Header
  ```json
  "Accept": "application/json",
  "User-Agent": "axios 0.21.1"
  ```

_200 - OK_
  ```json
  {
    "id": string,
    "joke": string,
    "status": integer
  }
  ```
_500 - Global Error_
  ```json
  {
    "error":string
  }