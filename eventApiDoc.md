## Endpoints

List of Available Endpoints:

## Events

- `GET /events`
- `PATCH /events/hands/:EventId`

### Endpoints with Authentication

- `PATCH /events/hands/:EventId`

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
  "message": String
}
```

### Endpoints with Authorization

- `PATCH /events/hands/:EventId`

#### Request

- Headers

```json
{
  "access_token": String
}
```

#### Error Response

_403 - Forbidden_

- Body

```json
{
  "message": String
}
```

### Endpoint: `GET /events`

#### Description

- Get a list of Events

#### Response

_200 - OK_

- Body

```json
{
  "message": String,
  "data": [
    {
      "nameOfEvent": String,
      "description": String,
      "dateOfEvent": Date,
      "imageUrl": String,
      "requiredHands": Integer,
      "receivedHands": Integer,
      "percentage": Integer,
    }
  ]
}
```

### Endpoint: `PATCH /events/hands/:EventId`

#### Description

- Update the number of hands received for an Event

#### Response

_200 - OK_

- Body

```json
{
  "message": String,
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
