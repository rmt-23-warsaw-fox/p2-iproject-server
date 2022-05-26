Movie API Documentation
Endpoints:
list of available endpoinst

GET /products
GET /products/majors
GET /products/:id/detail

POST /users/register
POST /users/login-google
POST /users/login

GET /login/listBuy
POST /login/:id/buy
POST /login/:id/deleteBuy


1. GET /products
Description:
 - Get all products from database

 Request
*response (200 - OK)*
```js

{
    "data": {
        "count": 17,
        "rows": [
            {
                "id": 2,
                "name": "Kimia Kelas 7",
                "totalVideo": 10,
                "price": 40000,
                "imgUrl": "https://images.theconversation.com/files/121885/original/image-20160510-20731-1pf8nwv.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop",
                "MajorId": 1,
                "createdAt": "2022-05-25T14:08:48.921Z",
                "updatedAt": "2022-05-25T14:08:48.921Z",
                "Buys": [
                    {
                        "PackageId": 2,
                        "createdAt": "2022-05-25T15:47:04.024Z",
                        "updatedAt": "2022-05-25T15:47:04.024Z",
                        "UserId": 2
                    }
                ],
                "Major": {
                    "id": 1,
                    "name": "ipa",
                    "createdAt": "2022-05-25T14:08:48.917Z",
                    "updatedAt": "2022-05-25T14:08:48.917Z"
                }
            },
            ...,
        ]
}
```
2. GET /products/majors
Description:
 - Get all majors from database
 Request
*response (200 - OK)*
```js
{
    "data": [
        {
            "id": 1,
            "name": "ipa",
            "createdAt": "2022-05-25T14:08:48.917Z",
            "updatedAt": "2022-05-25T14:08:48.917Z"
        },
        {
            "id": 2,
            "name": "ips",
            "createdAt": "2022-05-25T14:08:48.917Z",
            "updatedAt": "2022-05-25T14:08:48.917Z"
        },
        {
            "id": 3,
            "name": "bahasa",
            "createdAt": "2022-05-25T14:08:48.917Z",
            "updatedAt": "2022-05-25T14:08:48.917Z"
        }
    ]
}
```

3. GET /products/:id/detail
Description:
 - Get detail movie from database by id
 Request
 *response (200 - OK)*
 ```js
{
    "data": {
        "id": 1,
        "name": "Fisika Kelas 8",
        "totalVideo": 12,
        "price": 50000,
        "imgUrl": "https://scse.d.umn.edu/sites/scse.d.umn.edu/files/umd_dept_home/physics-chalkboard_cropped.jpg",
        "MajorId": 1,
        "createdAt": "2022-05-25T14:08:48.921Z",
        "updatedAt": "2022-05-25T14:08:48.921Z",
        "Users": [],
        "Major": {
            "id": 1,
            "name": "ipa",
            "createdAt": "2022-05-25T14:08:48.917Z",
            "updatedAt": "2022-05-25T14:08:48.917Z"
        }
    }
}
```

4. POST /users/register
 - Body:

```js
{
  "name": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
}
```
*Response(201 - Created)*

```js
{
  "id": "integer"
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
}
```
*Response(400 - Bad Request)*

```js
{
  "message": "name is required"
}
OR
{
  "message": "email is required"
}
OR
{
  "message": "email must be unique"
}
OR
{
  "message": "password is required"
}
```

5. POST /users/login-google
 - Body:

```js
{
  "token": "string",
}
```
*Response(201 - Created)*

```js
{
  "id": "integer"
  "email": "string",
  "password": "string",
}
```

6. POST /users/login
 - Body:

```js
{
  "email": "string",
  "password": "string"
}
```
*Response(200 - OK)*

```js
{
  "message": "success login",
  "access_token": "string"
}
```
*Response(401 - Unauthorized)*

```js
{
  "message": "Invalid email or password"
}
```

7. GET /login/listBuy
 - Header:
 ```js
{
  "access_token": "<your access token>"
}
 ```
 *response (200 - OK)*
 ```js
{
    "data": {
        "id": 2,
        "name": "budi",
        "email": "budi@yahoo.com",
        "password": "$2a$08$0s03FgT8Q02khMRZDC4zFuBDAUp5HNY0kiCz.6E1usPih3tPiHFXu",
        "phoneNumber": "00987654",
        "createdAt": "2022-05-25T14:08:48.840Z",
        "updatedAt": "2022-05-25T14:08:48.840Z",
        "Buys": [
            {
                "PackageId": 2,
                "createdAt": "2022-05-25T15:47:04.024Z",
                "updatedAt": "2022-05-25T15:47:04.024Z",
                "UserId": 2,
                "Package": {
                    "id": 2,
                    "name": "Kimia Kelas 7",
                    "totalVideo": 10,
                    "price": 40000,
                    "imgUrl": "https://images.theconversation.com/files/121885/original/image-20160510-20731-1pf8nwv.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop",
                    "MajorId": 1,
                    "createdAt": "2022-05-25T14:08:48.921Z",
                    "updatedAt": "2022-05-25T14:08:48.921Z",
                    "Major": {
                        "id": 1,
                        "name": "ipa",
                        "createdAt": "2022-05-25T14:08:48.917Z",
                        "updatedAt": "2022-05-25T14:08:48.917Z"
                    }
                }
            },
            ...,
        ]
}

 ```
8. POST /login/:id/buy
 - Header
```js
{
  "access_token": "<your access token>"
}
```
 - Params:

```js
{
  "id": "integer"
}
```
*Response(200 - OK)*

```js
{
  "PackageId": "integer",
  "UserId": "integer",
}
```
*Response(400 - Unauthorized)*

```js
{
  "message": "already added to the list"
}
```

9. Global Error
*Response (401 - Unauthorized)*
```js
{
  "message": "Unauthorized"
}
```
*Response (403 - Forbidden)*
```js
{
  "message": "Forbidden"
}
```

*Response (404 - Not Found)*
```js
{
  "message": "error not found"
}
```

*Response (500 - Internal Server Error)*
```js
{
  "message": "Internal server error"
}
```