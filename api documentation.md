## Endpoints

List of Available Endpoints:

### Food Endpoints

- `GET /destination`
- `GET /destination/:id`
- `POST /destination/:id/snap`
- `PATCH /destination/:id/order`

### 1. GET /destination

#### Description

- Get all the destination data

#### Response

_200 - OK_

- Body

  ```json
  {
  "statusCode": 200,
  "data": [
        {
            "id": 1,
            "name": "Pantai Kuta Beach",
            "region": "Bali",
            "imageUrl": "https://i.imgur.com/vchWkRA.jpg",
            "price": 4000000,
            "description": "2 Day 1 Nights trip ",
            "createdAt": "2022-05-26T08:01:38.837Z",
            "updatedAt": "2022-05-26T08:01:38.837Z"
        },
        ...
  ]}

  ```

### 2. GET /destination/:id

#### Description:

- Get destination by id

Request:

- params:

```json
{
  "id": "integer (required)"
}
```

#### Response

\_200 - OK

- Body
  ```json
  {
    "statusCode": 200,
    "data": {
      "id": 2,
      "name": "Candi Borobudur",
      "region": "Jogjakarta",
      "imageUrl": "https://i.imgur.com/iyhmuZy.jpg",
      "price": 2000000,
      "description": "3 Day 2 Nights trip ",
      "createdAt": "2022-05-26T08:01:38.837Z",
      "updatedAt": "2022-05-26T08:01:38.837Z"
    }
  }
  ```

_Response (404 - Destination not found)_

```json
{
  "message": "Destination not found"
}
```

&nbsp;

### 3. POST /destination/:id/snap

#### Description:

- Create order dan snap pay

  Request:

- params:

```json
{
  "id": "integer (required)"
}
```

- Body
  ```json
  {
    "fullName" : String,
    "email" : String,
    "phone" : String,
    "date" : Date,
    "amountOfPeople" : Integer,
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
  "token": token ,
  "redirect_url": redirect_url,
  "orderIDBE": orderId
  }
  ```

_Response (404 - Order not found)_

```json
{
  "message": "Order not found"
}
```

&nbsp;

&nbsp;

### 4. PATCH /destination/:id/order

#### Description:

- Update order from database by id

Request:

- params:

```json
{
  "id": "integer (required)"
}
```

- Body

  ```json
  {
    "statusCode": 200,
    "message" : `Order paid`,
    "data": {
    "fullName" : String,
    "email" : String,
    "phone" : String,
    "date" : Date,
    "amountOfPeople" : Integer,
  }
  }
  ```

  _Response (404 - Order not found)_

```json
{
  "message": "Order not found"
}
```

### Global Error

#### Response

_500 - Internal Server Error_

- Body
  ```json
  {
    "statusCode": 500,
    "error": {
      "message": "Internal Server Error"
    }
  }
  ```
