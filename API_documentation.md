# Go-Traveling API Documentation

## List of Available Endpoints of Users:

- `POST /users/register`
- `POST /users/login`
- `GET /users/travels`
- `GET /users/travels/:id`
- `GET /users/favorites`
- `POST /users/favorites/:id`
- `DELETE /users/favorites/:id`


### 1. POST /users/register

Description:
- Register new users

- Body
 ```json
 {
        "username": "String",
        "email": "String",
        "password": "String",
        "phoneNumber": "string",
        "address": "string",
 }
 ```

 _Response (201 - User has been created successfully)_
 
- Body
 ```json
 {
    "statusCode": 201,
    "message": "User has been created successfully",
    "data": {
        "id": "integer",
        "username": "string",
        "email": "string"
    }
 }
 ```

 _Response (400 - failed to create )_



 -Body
```json
{
  "message": "Email is required"
}
OR
{
  "message": "invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "password is required"
}
OR
{
  "message": "Password must be 5 - 10 characters"
}

```

### 2. POST /users/login

Description:
- Login users

- Body
 ```json
 {
        "email": "String",
        "password": "String",
 }
 ```

  _Response (200 - successful access)_
 
- Body
 ```json
 {
    "statusCode": 200,
    "access_token": "String",
    "idUser": "Integer",
    "message": "successful access"
 }
 ```

 _Response (401 - Invalid email or password)_

- Body
 ```json
 {
     "statusCode": 401,
    "message": "Invalid email or password"
 }
 ```

 ### 3. GET /users/travels

 Descriptions:
 -Get all data destination from database

_Response (200 - OK)_

```json
{
    "statusCode": 200,
    "message": "Successfully Access",
    "allTravelsData": [
        {
            "id": 10,
            "name": "Monumen Jogja Kembali",
            "imageUrl": "https://www.yogyes.com/id/yogyakarta-tourism-object/pilgrimage-sites/monjali/1.jpg",
            "description": "Monumen Yogya Kembali (Monjali) adalah museum untuk memperingati peristiwa direbutnya kembali Kota Yogyakarta dari penjajah Belanda pada 29 Juni 1949. Bangunannya yang berbentuk seperti tumpeng sangat ikonik.",
            "price": 200000,
            "RegionId": 1,
            "createdAt": "2022-05-25T23:01:13.926Z",
            "updatedAt": "2022-05-25T23:01:13.926Z",
            "Region": {
                "id": 1,
                "name": "Jogjakarta",
                "createdAt": "2022-05-25T23:01:13.830Z",
                "updatedAt": "2022-05-25T23:01:13.830Z"
            }
        },
        {
            "id": 9,
            "name": "Ratu Boko",
            "imageUrl": "https://www.yogyes.com/id/yogyakarta-tourism-object/candi/ratu-boko/1.jpg",
            "description": "Candi Ratu Boko adalah kompleks istana megah yang dibangun pada abad ke-8. Bangunan yang bisa dikatakan termegah di jamannya itu dibangun oleh salah satu kerabat pendiri Borobudur.",
            "price": 250000,
            "RegionId": 1,
            "createdAt": "2022-05-25T23:01:13.926Z",
            "updatedAt": "2022-05-25T23:01:13.926Z",
            "Region": {
                "id": 1,
                "name": "Jogjakarta",
                "createdAt": "2022-05-25T23:01:13.830Z",
                "updatedAt": "2022-05-25T23:01:13.830Z"
            }
        }
    ]
}

```

### 4. GET /users/travels/:id

Description:
- Show detil destination by id

_Response (200 - OK)_

```json
{
    "statusCode": 200,
    "message": "Successfully Access",
    "detailDestination": {
        "id": 1,
        "name": "Malioboro",
        "imageUrl": "https://www.yogyes.com/id/yogyakarta-tourism-object/other/malioboro/1.jpg",
        "description": "Malioboro adalah jantung Kota Jogja. Tak heran bila banyak penginapan murah dekat Malioboro, meskipun sekarang banyak hotel berbintang. Apa saja tempat wisata dan hotel dekat Malioboro? Temukan info lengkapnya di sini.",
        "price": 250000,
        "RegionId": 1,
        "createdAt": "2022-05-25T23:01:13.926Z",
        "updatedAt": "2022-05-25T23:01:13.926Z",
        "Region": {
            "id": 1,
            "name": "Jogjakarta",
            "createdAt": "2022-05-25T23:01:13.830Z",
            "updatedAt": "2022-05-25T23:01:13.830Z"
        }
    }
}

```

 _Response (400 - Bad Request)_

  -Body
```json
{
    "statusCode": 404,
    "message": "DESTINATION NOT FOUND"
}
```