## Endpoints 

List of Available Endpoints In Route:

- `POST /login`

<br />

## 1. POST /users/login

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

_400 - Bad Request_
```json
{
  "message": "Invalid Username/Password"
}
```



