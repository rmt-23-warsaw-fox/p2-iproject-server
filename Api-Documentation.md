## Endpoints

List of available endpoints:

- `POST /public/register`
- `POST /public/login`
- `POST public/login-google`
- `GET public/foods`
- `GET public/bookmarks`
- `POST public/bookmarks`
- `GET public/chefs`
- `GET public/orders`
- `POST public/orders`
- `DELETE public/bookmarks/:FoodId`
- `POST xendit/create`
- `POST xendit/pay`

### POST /public/register

#### Request

- Body
  ```json
  {
    "username": String,
    "email": String,
    "password": String,
    "role": String,
    "phoneNumber": String,
    "address": String
  }
  ```

#### Response

201 - Created

- Body
  ```json
  {
    "id": integer,
    "email": string
  }
  ```

400 - Bad request

- Body
  ```json
  {
    "message": string
  }
  ```

### POST /public/login

#### Request

- Body
  ```json
  {
    "email": String,
    "password": String,
  }
  ```

#### Response

200 - Ok

- Body
  ```json
  {
    "access_token": String
  }
  ```

400 - Bad request

- Body
  ```json
  {
    "message": string
  }
  ```

### POST /public/login-google

#### Request

- Body
  ```json
  {
    "token": String,
  }
  ```

#### Response

200 - Ok

- Body
  ```json
  {
    "access_token": String
  }
  ```

### POST /public/login-google

#### Request

- Body
  ```json
  {
    "token": String,
  }
  ```

#### Response

200 - Ok

- Body
  ```json
  {
    "access_token": String
  }
  ```

### GET /public/foods

#### Response

200 - Ok

- Body
  ```json
  {
    "data": [
      {
        "strMeal": String,
        "strMealThumb": String,
        "idMeal": String
      },
      ...
    ]
  }
  ```

### GET /public/bookmarks

#### Request

- Headers
  ```json
  {
    "access_token": String
  }
  ```

#### Response

200 - Ok

- Body
  ```json
  [
    {
      "id": Integer,
      "UserId": Integer,
      "FoodId": Integer,
      "OrderId": Integer,
      "createdAt": Date,
      "updatedAt": Date,
      "Food": {
        "id": Integer,
        "idMeal": Integer,
        "strMeal": String,
        "strMealThumb": String,
        "createdAt": Date,
        "updatedAt": Date,
      }
    },
    ...
  ]
  ```

### POST /public/bookmarks

#### Request

- Headers

  ```json
  {
    "access_token": String
  }
  ```

- Body
  ```json
  {
    "idMeal": Integer,
    "StrMeal": String,
    "strMealThumb": String
  }
  ```

#### Response

200 - Ok

- Body
  ```json
    {
      "id": Integer,
      "UserId": Integer,
      "FoodId": Integer,
      "OrderId": Integer,
      "createdAt": Date,
      "updatedAt": Date,
    }
  ```

### GET /public/chefs

#### Request

- Headers

  ```json
  {
    "access_token": String
  }
  ```

#### Response

200 - Ok

- Body
  ```json
  [
    {
      "id": Integer,
      "name": String,
      "age": Integer,
      "gender": String,
      "price": Integer,
      "createdAt": Date,
      "updatedAt": Date,
    },
    ...
  ]
  ```

### GET /public/orders

#### Request

- Headers

  ```json
  {
    "access_token": String
  }
  ```

#### Response

200 - Ok

- Body
  ```json
  [
    {
      "id": Integer,
      "ChefId": Integer,
      "totalPrice": Integer,
      "status": String,
      "virtualAccount": String,
      "external_id": String,
      "UserId": Integer,
      "createdAt": Date,
      "updatedAt": Date,
    }
  ]
  ```

### POST /public/orders

#### Request

- Headers

  ```json
  {
    "access_token": String
  }
  ```

#### Response

200 - Ok

- Body

  ```json
  {
    "message": "Order updated successfully"
  }
  ```

  OR

  ```json
  {
    "id": Integer,
    "ChefId": Integer,
    "totalPrice": Integer,
    "status": String,
    "virtualAccount": String,
    "external_id": String,
    "UserId": Integer,
    "createdAt": Date,
    "updatedAt": Date,
  }
  ```

### DELETE /public/bookmarks/:FoodId

#### Request

- Headers

  ```json
  {
    "access_token": String
  }
  ```

#### Response

200 - Ok

- Body

  ```json
  {
    "message": "Bookmark deleted successfully"
  }
  ```

### POST /xendit/create

#### Request

- Headers

  ```json
  {
    "access_token": String
  }
  ```

- Body
  ```json
  {
    "bank_code": String,
    "totalPrice": Integer
  }
  ```

#### Response

200 - Ok

- Body

  ```json
  {
    "id": String,
    "name": String,
    "status": String,
    "created": Date,
    "updated": Date,
    "currency": String,
    "owner_id": String,
    "bank_code": String,
    "is_closed": Boolean,
    "external_id": String,
    "is_single_use": Boolean,
    "merchant_code": String,
    "account_number": String,
    "expected_amount": Integer,
    "expiration_date": Date,
    "suggested_amount": Integer
  }
  ```

### POST /xendit/pay

#### Request

- Headers

  ```json
  {
    "access_token": String
  }
  ```

- Body
  ```json
  {
    "bank_code": String,
    "totalPrice": Integer
  }
  ```

#### Response

200 - Ok

- Body

  ```json
  {
    "status": String,
    "message": String
  }
  ```
