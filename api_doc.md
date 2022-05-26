# Branded API Documentation

## Endpoints :

List of available endpoints music radio:

- `GET /`
- `GET /radioPosition`
- `POST /songs`
- `GET /songs/:id`
- `GET /:stationId`

&nbsp;

## 1. GET /

Description:

- Get all radio list

_Response (200 - OK)_

```json
{
	"totalPage": 15,
	"data": [
		{
			"stationId": "96416681-0601-11e8-ae97-52543be04c81",
			"name": "AKSI AM MEDAN",
			"url": "http://live.radiobethany.com:8152/;",
			"tags": "media kristen",
			"country": "Indonesia",
			"state": "Medan",
			"votes": 330,
			"lat": null,
			"long": null,
			"icon": "http://radioaksi.com/favicon.ico"
		},
		{
			"stationId": "fefe9830-08af-49c5-bc3e-1d0b3b879706",
			"name": "Akurat FM Solo",
			"url": "http://c1.siar.us:9350/stream",
			"tags": "media kristen",
			"country": "Indonesia",
			"state": "Surakarta",
			"votes": 43,
			"lat": null,
			"long": null,
			"icon": "https://cdn.onlineradiobox.com/img/l/0/82050.v3.png"
		},
    ...
  ]
}
```
_Response (404 - Not found)_

```json
{
	"message": "Radio not found"
}
```


## 2. GET /radioPosition

Description:

- Get all radio position

_Response (200 - OK)_

```json
{
	"data": [
		{
			"stationId": "f36067b3-bb5f-476c-9d55-dccc26f3f8aa",
			"name": "Al-Faruq Purwokerto Banyumas <24kb aac+>",
			"icon": "https://i0.wp.com/alfaruq.net/wp-content/uploads/2018/08/PIC-INFO.png?zoom=2&resize=230%2C230&ssl=1",
			"position": {
				"lat": -7.509854031004886,
				"lng": 109.07569885253908
			}
		},
		{
			"stationId": "5a65c6a0-1452-4989-8c8a-bd62e81324e0",
			"name": "An-Nashihah Makassar <MP3 32 kbps>",
			"icon": "http://radio.an-nashihah.com/wp-content/uploads/2017/04/logo-radio-an-nashihah.jpg",
			"position": {
				"lat": -5.1813777290527065,
				"lng": 119.43408966064456
			}
		},
  ]
}
```

## 2. GET /radioPosition

Description:

- Get all radio position

_Response (200 - OK)_

```json
{
	"data": [
		{
			"stationId": "f36067b3-bb5f-476c-9d55-dccc26f3f8aa",
			"name": "Al-Faruq Purwokerto Banyumas <24kb aac+>",
			"icon": "https://i0.wp.com/alfaruq.net/wp-content/uploads/2018/08/PIC-INFO.png?zoom=2&resize=230%2C230&ssl=1",
			"position": {
				"lat": -7.509854031004886,
				"lng": 109.07569885253908
			}
		},
		{
			"stationId": "5a65c6a0-1452-4989-8c8a-bd62e81324e0",
			"name": "An-Nashihah Makassar <MP3 32 kbps>",
			"icon": "http://radio.an-nashihah.com/wp-content/uploads/2017/04/logo-radio-an-nashihah.jpg",
			"position": {
				"lat": -5.1813777290527065,
				"lng": 119.43408966064456
			}
		},
  ]
}
```
## 3. POST /songs

Description:

- Get songs by artist or title or album

Request:

- body : (required)

```json
{
  "artist": "Justin",
}
```

_Response (200 - Ok)_

```json
[
	{
		"id": 1280165212,
		"name": "Justin Bieber",
		"title": "Ghost",
		"url": "https://cdns-preview-5.dzcdn.net/stream/c-5a5fb2a297fc05d6e42cc359c5602e24-4.mp3",
		"icon": "https://e-cdns-images.dzcdn.net/images/artist/22dd86b628a03d8dad3c7dfb33320a91/250x250-000000-80-0-0.jpg",
		"album": "Justice"
	},
	{
		"id": 82299064,
		"name": "Justin Timberlake",
		"title": "What Goes Around...Comes Around (Radio Edit)",
		"url": "https://cdns-preview-a.dzcdn.net/stream/c-a59eab57f81050f87b178380025a851e-7.mp3",
		"icon": "https://e-cdns-images.dzcdn.net/images/artist/7c2c076d891f64a039b572fea7df3b96/250x250-000000-80-0-0.jpg",
		"album": "What Goes Around...C"
	},
	{
		"id": 969494,
		"name": "Justin Timberlake",
		"title": "Cry Me a River",
		"url": "https://cdns-preview-0.dzcdn.net/stream/c-065c43d27032a85c93bf25f48f08e706-7.mp3",
		"icon": "https://e-cdns-images.dzcdn.net/images/artist/7c2c076d891f64a039b572fea7df3b96/250x250-000000-80-0-0.jpg",
		"album": "Justified"
	},
  ...
]
```
_Response (404 - Not found)_

```json
{
	"message": "Song not found"
}
```
## 4. GET /songs/:id

Description:

- Get song by id

request: 

- params : 

```json
{
  "id": 1280165212,
}
```

_Response (200 - OK)_

```json
{
	"id": 1280165212,
	"name": "Justin Bieber",
	"title": "Ghost",
	"url": "https://cdns-preview-5.dzcdn.net/stream/c-5a5fb2a297fc05d6e42cc359c5602e24-4.mp3",
	"icon": "https://e-cdns-images.dzcdn.net/images/artist/22dd86b628a03d8dad3c7dfb33320a91/250x250-000000-80-0-0.jpg",
	"album": "Justice",
	"realeaseDate": "2021-03-19"
}
```
_Response (404 - Not found)_

```json
{
	"message": "Song not found"
}
```

## 4. GET /:stationId

Description:

- Get radio by id

request: 

- params : 

```json
{
  "stationId": "42c005a9-a51a-4d2e-813d-cd66b252332c",
}
```

_Response (200 - OK)_

```json
[
	{
		"stationId": "42c005a9-a51a-4d2e-813d-cd66b252332c",
		"name": "Kalaweit Radio ",
		"url": "http://103.28.149.117:8012/live",
		"tags": "contemporary hits radio",
		"country": "Indonesia",
		"state": "Central Kalimantan",
		"votes": 24,
		"lat": -2.2274066509893533,
		"long": 113.93486339725102,
		"icon": "https://cdn3.dan.com/assets/icons/touch-icon-iphone-retina-42b99bfa7f037e7773362a76bf1ee70632541e4054f9003ce6f190dc9070fd8d.png"
	}
]
```
_Response (404 - Not found)_

```json
{
	"message": "Radio not found"
}
```

&nbsp;

## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "statusCode": 500,
  "message": "Internal server error"
}
```