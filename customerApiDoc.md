## Endpoints

List of Available Endpoints:

## Users

- `POST /users/register`
- `POST /users/login`
- `GET /users/history`
- `POST /users/before-transaction`
- `POST /users/after-transaction`

### Endpoints with Authentication

- `GET /users/history`
- `POST /users/before-transaction`
- `POST /users/after-transaction`

#### Request

- Headers

```json
{
  "access_token": String
}
```

#### Error Response

_401 - Unauthorized_

- Body

```json
{
  "statusCode": 401,
  "message": String
}
```

### Endpoint: `POST /register`

### Description

- Register a new Customer

#### Request

- Headers

```json
{
  "Content-Type": "application/x-www-form-urlencoded"
}
```

- Body

```json
{
  "email" : String,
  "password": String
}
```

#### Response

_201 - Created_

- Body

```json
{
  "message": String
}
```

_400 - Bad Request_

- Body

```json
{
  "message": String
}
```

### Endpoint: `POST /login`

### Description

- Login a user

#### Request

- Headers

```json
{
  "Content-Type": "application/x-www-form-urlencoded"
}
```

- Body

```json
{
  "email" : String,
  "password": String
}
```

#### Response

_200 - OK_

- Body

```json
{
  "message": String
}
```

_401 - unauthorized_

- Body

```json
{
  "message": String
}
```

### Endpoint: `GET /users/history`

#### Description

- Get history of user giving Hands

#### Response

_200 - OK_

- Body

```json
{
  "message": String,
  "data": [
    {
      "CustomerId": Integer,
      "EventId": Integer,
      "Event": {
        "nameOfEvent": String,
        }
    }
  ]
}
```

### Endpoint: `POST /before-transaction`

### Description

- Setting up the user to ready for transaction

#### Request

- Headers

```json
{
  "Content-Type": "application/x-www-form-urlencoded"
}
```

- Body

```json
{
  "OrderedHands" : Integer,
}
```

#### Response

_200 - OK_

- Body

```json
{
  "token": String,
  "redirect_url": String
}
```

_401 - unauthorized_

- Body

```json
{
  "message": String
}
```

### Endpoint: `POST /after-transaction`

### Description

- After user transaction is done, updating the user Hands

#### Request

- Headers

```json
{
  "Content-Type": "application/x-www-form-urlencoded"
}
```

- Body

```json
{
  "OrderedHands" : Integer,
}
```

#### Response

_200 - OK_

- Body

```json
{
  "statusCode": 200,
  "message": String
}
```

_401 - unauthorized_

- Body

```json
{
  "message": String
}
```

### Global Error

#### Response

_500 - Internal Server Error_

- Body

```json
{
  "statusCode": 500,
  "message": String
}
```
