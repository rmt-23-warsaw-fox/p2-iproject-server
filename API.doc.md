## Endpoints News

List of Available Endpoints In Route:

- `POST /login`
- `POST /register`
- `GET /`
- `GET /:categories`
- `GET /:categories/detailNews`
- 
 Authentication
- `GET /favoritesNews`
- `POST /favoritesNews`
- `POST /comments`
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
    ],
    "category" : array
```


## 4. GET /:categories
### Request


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

<br/>

## 6. GET /detailNews/:id

### Request
- body

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



## 7. POST /favoritesNews

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


## 8. POST /comments

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


## 9. DELETE /delete

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
    "message" = "ID Product Not Found"
}
```


_403 - Forbidden_
```json
{
    "message" = "NOT_ALLOWED"
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



