## Endpoints News

List of Available Endpoints In Route:

- `POST /login`
- `POST /register`
- `GET /`
- `GET /categories`
- `GET /favoritesNews`

 Authentication

<br />
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

## 3. GET /

### Response
_200 - OK_
```json
 data: [
        {
            "link": string,
            "title": string,
            "pubDate": string,
            "description": string,
            "thumbnail": string
        },
    ]
```


## 4. GET /categories

### Response
_200 - OK_
```json
 [
    {
        "id": integer,
        "name": string,
        "path": string,
        "createdAt": string,
        "updatedAt": string
    }
 ]
```

## 5. GET /favoritesNews

### Request
- Headers

```json
{
  "access_token" : string
}
```

### Response
_200 - OK_
```json
[
    {
        "id": integer,
        "UserId": integer,
        "LinkId": string,
        "createdAt":string,
        "updatedAt": string
    }
]
```
_404 - Not Found_
```json
{
    "message" : "Your List Empty"
}
```


### Global Error
#### Response

_500 - Internal Server Error_

  ```json
  {
      "message": "Internal Server Error"
  }
  ```

_401 - Unauthorized_
```json
{
  "message": "Token Is Invalid"
},
{
  "message": "Invalid Username/Password"
},
{
  "message": "User Not Found"
}
```



