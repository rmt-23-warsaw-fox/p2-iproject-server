## Endpoints 

List of Available Endpoints In Route:

- `POST /login`
- `POST /register`

<br />

## 1. POST /login

### Request
- body

```json
{
  "password": "string",
  "email" : "string"
}
```

### Response
_200 - OK_
```json
{
  "access_token": "string"
}
```

_401 - Unauthorized_
```json
{
  "message": "Invalid Username/Password"
}
```

<br />

## 2. POST /register

### Request
- body

```json
{
  "password": "string",
  "email" : "string",
  "username" : "string"
}
```

### Response
_201 - OK_
```json
{
    "message" : "Successfully registered",
    "username" : "string"
}
```

_400 - Bad Request_
```json
{
  "message": "username is required"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Password is required"
}

```



