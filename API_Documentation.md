# Rent Room API Documentation

## Endpoints

List of available endpoints:

- POST /public/user/register
- POST /public/user/login
- post /public/user/signin-with-google
- GET /public/user/getuserprofile
- GET /type
- GET /public/accomodation
- GET /public/accomodation/search
- GET /public/accomodation/filter
- GET /public/accomodation/detail/:id
- GET /public/wishlist
- POST /public/wishlist/add
- POST /public/wishlist/payment
- GET /public/wishlist/transactions
- POST /public/wishlist/payment-status
- GET /public/wishlist/:id
- GET /admin/register
- GET /admin/login

## 1. POST /public/user/register

Description:

- Create a new user.

Request:

- body:

```js
   {
        email: "string"
        password: "string",
        phoneNumber: "string",
        address: "string",
        firstName: "string",
        lastName: "string"
   }
```

- _Response (201 - Created)_

```js
   {
       "message": "You have successfully registered",
   }
```

- _Response (400 - Bad Request)_

```js

        {
            "message": "Email is required"
        },
        OR
        {
            "message": "Password is required"
        },
        OR
        {
            "message": "Password minimum 6 characters"
        },
        OR
        {
            "message": "First Name is required"
        },
        OR
        {
            "message": "Last Name is required"
        },
        OR
        {
            "message": "Address is required"
        },
        OR
        {
            "message": "Email has been registered",
        }
```

## 2. POST /public/user/login

Description:

- Login to web application.

Request:

- body:

```js
   {
        email: "string"
        password: "string",
   }
```

- _Response (201 - Created)_

```js
   {
       "access_token": "string",
   }
```

- _Response (401 - Unauthorized)_

```js

        {
            "message": "Error user not found or password not matched"
        },
```

## 3. POST /public/user/signin-with-google

Description:

- Login to homepage with google account.

Request:

- body:

```js
{
  token: string;
}
```

- _Response (200 - Ok)_

```js
   {
       access_token: "string"
   }
```

## 4. GET /public/user/getuserprofile

Description:

- Find detail data user

- _Response (200 - OK)_

```js
{
    "user": {
        "id": 1,
            "email": "customer@gmail.com",
            "firstName": "Dandi",
            "lastName": "Rahmadani",
            "phoneNumber": "082364900755",
            "address": "Jalan Batang Kuis Pasar 9",
            "createdAt": "2022-05-26T05:48:42.213Z",
            "updatedAt": "2022-05-26T05:48:42.213Z"    
    }
}
```

- _Response (404 - Not Found)_

```js
    {
        "message": "User not found"
    }
```

## 5. GET /type

Description:

- Get all type room from database

Request

- _Response (200 - OK)_

```js
    [
        {
            "id": 1,
            "name": "Homestay",
            "createdAt": "2022-05-26T05:45:10.963Z",
            "updatedAt": "2022-05-26T05:45:10.963Z"
        },
        {
            "id": 2,
            "name": "Apartement",
            "createdAt": "2022-05-26T05:45:10.963Z",
            "updatedAt": "2022-05-26T05:45:10.963Z"
        },
    [

```

## 6. GET /public/accomodation

Description:

- Get all accomodation from database

- _Response (200 - OK)_

```js
[
    {
        "id": 11,
        "name": "Remarkable Studio at Baileys City Apartment",
        "facility": "Kitchen,Living Room,Bathroom,Bedroom,FitnessCenter,Wifi,Swimming Pool,Camera CCTV 24 Hour",
        "roomCapacity": 2,
        "imageUrl": "https://cdn.travelio.id/hotel/2a4ec-601150deff486a6c7107a0f5/2_l.jpg",
        "AdminId": 1,
        "location": "Jl. Dewi Sartika No.31, Ciputat, Kec. Ciputat, Kota Tangerang Selatan, Banten 15411",
        "price": 490000,
        "TypeId": 1,
        "city": "Kota Tangerang",
        "createdAt": "2022-05-26T05:45:11.044Z",
        "updatedAt": "2022-05-26T05:45:11.044Z",
        "Type": {
            "name": "Homestay"
        }
    },
    ...
]
```

## 7. GET /public/accomodation/search

Description:

- Get accomodation by city or type room

Request

- query:

```js
{
  city: "string",
  TypeId: integer
}
```

- _Response (200 - OK)_

```js
[
    {
        "id": 1,
        "name": "Apartemen Fancy Look 2BR at West Vista Apartment",
        "facility": "Kitchen,Living Room,Bathroom,Bedroom,FitnessCenter,Wifi,Swimming Pool,Camera CCTV 24 Hour",
        "roomCapacity": 2,
        "imageUrl": "https://cdn.travelio.id/hotel/07d7c-5dddf1e53ad9617e58d2b218/INA-8855_s.jpg",
        "AdminId": 1,
        "location": "Jl. Sentra Primer Timur, RT.5/RW.8, Pulo Gebang, Cakung, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13950",
        "price": 456000,
        "TypeId": 1,
        "city": "Kota Jakarta",
        "createdAt": "2022-05-26T05:45:11.044Z",
        "updatedAt": "2022-05-26T05:45:11.044Z",
        "Type": {
            "name": "Homestay"
        },
        ...
    },
]
```

## 8. GET /public/accomodation/filter

Description:

- Get accomodation by location or city

Request

- query:

```js
{
  city: "string",
  location: "string"
}
```

- _Response (200 - OK)_

```js
[
    {
        "id": 1,
        "name": "Apartemen Fancy Look 2BR at West Vista Apartment",
        "facility": "Kitchen,Living Room,Bathroom,Bedroom,FitnessCenter,Wifi,Swimming Pool,Camera CCTV 24 Hour",
        "roomCapacity": 2,
        "imageUrl": "https://cdn.travelio.id/hotel/07d7c-5dddf1e53ad9617e58d2b218/INA-8855_s.jpg",
        "AdminId": 1,
        "location": "Jl. Sentra Primer Timur, RT.5/RW.8, Pulo Gebang, Cakung, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13950",
        "price": 456000,
        "TypeId": 1,
        "city": "Kota Jakarta",
        "createdAt": "2022-05-26T05:45:11.044Z",
        "updatedAt": "2022-05-26T05:45:11.044Z",
        "Type": {
            "name": "Homestay"
        }
    },
    ...
]
```


## 9. GET /public/accomodation/detail/:id

Description:

- Find accomodation by id

Request:

- params:

```js
    {
        "id": "integer"
    }
```

- _Response (200 - OK)_

```js
{
    "id": 1,
    "name": "Apartemen Fancy Look 2BR at West Vista Apartment",
    "facility": "Kitchen,Living Room,Bathroom,Bedroom,FitnessCenter,Wifi,Swimming Pool,Camera CCTV 24 Hour",
    "roomCapacity": 2,
    "imageUrl": "https://cdn.travelio.id/hotel/07d7c-5dddf1e53ad9617e58d2b218/INA-8855_s.jpg",
    "AdminId": 1,
    "location": "Jl. Sentra Primer Timur, RT.5/RW.8, Pulo Gebang, Cakung, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13950",
    "price": 456000,
    "TypeId": 1,
    "city": "Kota Jakarta",
    "createdAt": "2022-05-26T05:45:11.044Z",
    "updatedAt": "2022-05-26T05:45:11.044Z",
    "Type": {
        "name": "Homestay"
    }
}
```

- _Response (404 - Not Found)_

```js
{
    "message": "Accomodation not found"
}
```

## 10. GET /public/wishlist

Description:

- Fetch all data wishlist

Request:

- headers:

```js
{
  access_token: string;
}
```

_Response (200 - OK)_

```js
{
        "id": 2,
        "AccomodationId": 20,
        "UserId": 14,
        "TypeId": 2,
        "Type": {
            "name": "Apartement"
        },
        "Accomodation": {
            "id": 20,
            "name": "Cozy Studio Apartment Margonda Residence 4 near Train Station",
            "facility": "Kitchen,Living Room,Bathroom,Bedroom,FitnessCenter,Wifi,Swimming Pool,Camera CCTV 24 Hour",
            "roomCapacity": 3,
            "imageUrl": "https://cdn.travelio.id/hotel/ec4ae-61287357a6d0786f4fd1cf2b/DSCF4469_l.jpg",
            "AdminId": 1,
            "location": "Kemiri Muka, Beji, Kemiri Muka, Beji, Kota Depok, Jawa Barat 16423",
            "price": 800000,
            "TypeId": 2,
            "city": "Kota Depok",
            "createdAt": "2022-05-26T05:45:11.044Z",
            "updatedAt": "2022-05-26T05:45:11.044Z"
        }
    },
```




Description:

- Delete favorite by id

Request:

- headers:

```js
    {
        "access_token": "string"
    }
```

- params:

```js
    {
        "id": "integer (required)"
    }
```

- _Response (200 - OK)_

```js
    {
       "message": "Delete movie from your favorite list successfully !!!"
    }
```

- _Response (404 - Not Found)_

```js
    {
        "statusCode": 404,
        "message": "Favorite not found"
    }
```

- _Response (500 - Internal Server Error)_

```js
    "message": "Internal Server Error"
```

## Global Error

- _Response (500 - Internal Server Error)_

```js
{
    message: "Internal Server Error"
}
```

- _Response (401 - Unauthorized)_

```js
{
    message: "Invalid token"
}
```

