## 1. POST /users/register

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "address": "string",
  "phone": "string"
}
```

_Response (201 - Created)_

```json
{
  "statusCode": 201,
  "message": "Register success",
  "data": {
    "id": 13,
    "username": "Tita Mulyana",
    "email": "titamulyana10@gmail.com",
    "phone": "5456767",
    "address": "kuningan"
  }
}
```

## 2. POST /users/login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response 201_

```json
{
  "message": "Succes Login",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsInVzZXJuYW1lIjoiVGl0YSBNdWx5YW5hIiwiZW1haWwiOiJ0aXRhbXVseWFuYTEwQGdtYWlsLmNvbSIsImlhdCI6MTY1MzQ1NTM3Mn0.T48R_BxsFkIYWz9F_VGEQTNnseRrUSw6g5lFI7Fnwhk"
}
```

## 3. PUT /users/login

Request

- query

```
   "token" : string
```

_response_

```json
{
  "message": "Your Account ready to use",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsInVzZXJuYW1lIjoiVGl0YSBNdWx5YW5hIiwiZW1haWwiOiJ0aXRhbXVseWFuYTEwQGdtYWlsLmNvbSIsImlhdCI6MTY1MzQ1NTUyMH0.yGN3SdXj4Nmc4v_JnwIVBjII9yyUgXbbQk7F9BcmZp8"
}
```

#### Error

```json
{
   "statusCode": 400,
   "message": "Password Incorect"
} or
{
   "statusCode": 400,
   "message": "email already in use"
} or
{
   "statusCode": 403,
   "message": "please check email to activate"
}
```

## 4. PUT /coins/add

- headers:

```json
{
  "access_token": "string"
}
```

- requset body

```
   name: string,
   statusCode: string,
   price: string,
   percentace: string,
   image: string,
```

_response_

```json
{
  "message": "Success add inicoin coin to bookmark"
}
```

## 5. GET /coins

request

- headers:

```json
{
  "access_token": "string"
}
```

_response_

```
[
    {
        "id": "714",
        "name": "Zetacoin",
        "country_id": "767",
        "pair_id": 1071390,
        "currency_symbol": "ZET",
        "inst_price_usd": "0.004087",
        "pair_change_arrow": "up_green",
        "change_percent_1d": "+347.69%",
        "pair_change_percent_numeric": "347.69",
        "change_percent_1d_color": "#3fc932",
        "change_percent_7d": "+0.79%",
        "percent_change_7d_plain": "0.79",
        "change_percent_7d_color": "#3fc932",
        "cross_rates_name": "ZET",
        "inst_price_btc": "0.0000000200028",
        "inst_market_cap": "&#x24;105.28K",
        "inst_market_cap_plain": "105281.15054826355",
        "volume_24h_usd": "&#x24;0",
        "volume_24h_usd_plain": "0",
        "total_volume_plain": "0.00",
        "total_volume": "0.00%",
        "flag_url": "https://i-invdn-com.investing.com/ico_flags/80x80/v32/zetacoin.png",
        "logo_url": "https://i-invdn-com.investing.com/ico_flags/80x80/v32/zetacoin.png"
    },..
]

```

## 6 GET /coins/news

- headers:

```json
{
  "access_token": "string"
}
```

_response_

```
[
    {
        "title": "Ethereum Beacon Chain Experienced a 7-block Reorg, More Work Needed Ahead of The Merge",
        "url": "https://cryptonews.com/news/ethereum-beacon-chain-experienced-a-7-block-reorg-more-work-needed-ahead-of-the-merge.htm",
        "source": "cryptonews.com"
    },
]
```

## Error Global

```
{
    statusCode : 500;
    message : "Internal Server Error";
} or
{
    statusCode = 400;
    message = "email already in use";
} or
{
    statusCode = 404;
    message = "User not Found";
} or 
{
    statusCode = 400;
    message = "Password Incorect";
} or 
{
    statusCode = 403;
    message = "access forbidden / must login";
} or 
{
    statusCode = 403;
    message = "please check email to activate";
} or 
{
    statusCode = 404, 
    message = "email & password required";
} or 
{
    statusCode = 404, 
    message = "Coins has added"
}
```
