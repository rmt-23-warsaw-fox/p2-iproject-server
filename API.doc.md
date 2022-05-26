## Endpoints News

List of Available Endpoints In Route:

- `POST /login`
- `POST /login-google`
- `POST /register`
- `GET /`
- `GET /weather`
- `GET /:categories`
- `POST /:categories/detailNews`
- 
 Authentication
- `GET /favoritesList/List`
- `POST /favoritesNews`
- `POST /comments/news`
Authorization

- `DELETE /delete`

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

## 2. POST /login-google

### Request
- body

```json
{
  "tokenGoogle": "string",
}
```

### Response
_200 - OK_
```json
{
  "statusCode": 200,
  "message": "Welcome",
  "id": integer,
  "access_token" : string`
}
```


<br />

## 3. POST /register

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

## 4. GET /

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
    ],
```


## 5. GET /:categories
### Request
- params
- query
```json
{
  "params": "string" (for category)
  "page": integer (for Pagination)
}
```

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

## 6. GET /favoritesList/List

### Request
- Headers

```json
{
  "access_token" : string,
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

<br/>

## 7. GET /:categories/detailNews

### Request
- params
- body

```json
{
  "url" : string
}
```

```json
{
  "url" : string(url)
}
```

### Response
_200 - OK_
```json
[
    "show": {
        "id": integer,
        "link": string,
        "title": string,
        "date": string,
        "description": string,
        "thumbnail": string,
        "CategoryId": integer,
        "createdAt": string,
        "updatedAt": string
        }
]
```



## 8. POST /favoritesNews

### Request
- headers

```json
{
  "access_token" : string
}
```
- body
```json
{
    "link" : string(URL),
}
``` 
### Response
_200 - OK_
```json

{
    "message": "successfully Create"
}

```


## 9. POST /comments

### Request
- headers

```json
{
  "access_token" : string
}
```
- body
```json
{
    "link" : string(URL),
},
{
    "comment" : string
}
``` 
### Response
_200 - OK_
```json

[
    {
        "id": integer,
        "comment": string,
        "UserId": integer,
        "LinkId": string,
        "createdAt": string,
        "updatedAt": string
    }
]

```


## 10. DELETE /delete

### Request
- headers

```json
{
  "access_token" : string
}
```
- body
```json
{
    "link" : string(URL),
}
``` 
### Response
_200 - OK_
```json

{
    "message": "Success Erase Your Favorite News"
}

```

_404 - Not Found_
```json
{
    "message" : "ID Product Not Found"
}
```


_403 - Forbidden_
```json
{
    "message" : "NOT_ALLOWED"
}
```



## 11. GET /weather

### Request
- query

```json
{
  "Place": "string",
}
```

### Response
_200 - OK_
```json
{
  Data API from Weather
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



