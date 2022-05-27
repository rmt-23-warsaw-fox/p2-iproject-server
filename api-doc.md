# Nonton Movie Yuk API Documentation

## Endpoints :

List of available endpoints:
​

- `POST /register`
- `POST /login`
- `GET /reviews`
- `GET /reviews/detail/:id`
- `GET /movies/search`
- `GET /movie-detail/:MovieId`
- `GET /movie-trending`

Routes below need authentication:

- `POST /reviews/add/:MovieId`
- `PATCH /reviews/add/:MovieId`
- `DELETE /reviews/add/:MovieId`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "fullname": "string",
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "fullname": "string",
  "email": "string"
}
```

_Response (403 - Bad Request)_

```json
{
  "error": "object"
}
```

## 1. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "access_token": "string"
}
```

_Response (403 - Bad Request)_

```json
{
  "error": "object"
}
```

&nbsp;

## 3. GET /reviews

Description:

- Fetch all reviews from database

_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "UserId": "integer",
        "MovieId": "integer",
        "review": "string",
        "createdAt": "date",
        "updatedAt": "date"
    },
    ...,
]
```

&nbsp;

## 4. GET /reviews/detail/:id

Description:

- Fetch a detail data of review from database

Request:
- params: ID of description

_Response (200 - OK)_

```json
{
  "id": "integer",
  "UserId": "integer",
  "MovieId": "integer",
  "review": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Not Found"
}
```
&nbsp;

## 5. `GET /movies/search`
Description:
- Fetch a list of movies based on the search parameters

Request:
- query: string (required)

_Response (200 - OK)_
```json
{
  "page": 1,
  "results": [
    {
      "id": 34,
      "logo_path": "/GagSvqWlyPdkFHMfQ3pNq6ix9P.png",
      "name": "Sony Pictures"
    },
    {
      "id": 15454,
      "logo_path": null,
      "name": "Sony / Monumental Pictures"
    },
    {
      "id": 8285,
      "logo_path": null,
      "name": "Sony Pictures Studio"
    },
    {
      "id": 30692,
      "logo_path": null,
      "name": "Sony Pictures Imageworks (SPI)"
    },
    {
      "id": 3045,
      "logo_path": null,
      "name": "Sony Pictures Releasing"
    },
    {
      "id": 5752,
      "logo_path": "/sFg00KK0vVq3oqvkCxRQWApYB83.png",
      "name": "Sony Pictures Entertainment"
    },
    {
      "id": 7431,
      "logo_path": null,
      "name": "Sony Pictures Entertainment (SPE)"
    },
    {
      "id": 63520,
      "logo_path": null,
      "name": "Sony Pictures International"
    },
    {
      "id": 65451,
      "logo_path": null,
      "name": "Sony Pictures Digital"
    },
    {
      "id": 94444,
      "logo_path": null,
      "name": "Sony Pictures Networks"
    },
    {
      "id": 86203,
      "logo_path": null,
      "name": "Sony Pictures Television International"
    },
    {
      "id": 82346,
      "logo_path": null,
      "name": "Sony Pictures Entertainment Japan"
    },
    {
      "id": 101555,
      "logo_path": null,
      "name": "Sony Pictures Productions"
    },
    {
      "id": 5388,
      "logo_path": "/i6tbNeVEi7s1uN97s2o0LhEMuF0.png",
      "name": "Sony Pictures Home Entertainment"
    },
    {
      "id": 11073,
      "logo_path": "/wHs44fktdoj6c378ZbSWfzKsM2Z.png",
      "name": "Sony Pictures Television"
    },
    {
      "id": 58,
      "logo_path": "/voYCwlBHJQANtjvm5MNIkCF1dDH.png",
      "name": "Sony Pictures Classics"
    },
    {
      "id": 2251,
      "logo_path": "/8PUjvTVmtJDdDXURTaSoPID0Boj.png",
      "name": "Sony Pictures Animation"
    },
    {
      "id": 34686,
      "logo_path": null,
      "name": "Sony Pictures Entertainment Inc."
    },
    {
      "id": 14577,
      "logo_path": null,
      "name": "Sony Pictures Worldwide Acquisitions (SPWA)"
    }
  ],
  "total_pages": 1,
  "total_results": 19
}
```

_Response (401 = BAD request)_

```json
{
  "status_message": "Invalid API key: You must be granted a valid key.",
  "success": false,
  "status_code": 7
}
```

## 6. `GET /movies/movie-detail/:MovieId`
Description:
- Fetch a detail data of a movie based on its id.

Request:
- params: integer (MovieId)

_Response (200 - OK)_
```json
{
  "adult": false,
  "backdrop_path": "/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg",
  "belongs_to_collection": null,
  "budget": 63000000,
  "genres": [
    {
      "id": 18,
      "name": "Drama"
    }
  ],
  "homepage": "",
  "id": 550,
  "imdb_id": "tt0137523",
  "original_language": "en",
  "original_title": "Fight Club",
  "overview": "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground \"fight clubs\" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.",
  "popularity": 0.5,
  "poster_path": null,
  "production_companies": [
    {
      "id": 508,
      "logo_path": "/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png",
      "name": "Regency Enterprises",
      "origin_country": "US"
    },
    {
      "id": 711,
      "logo_path": null,
      "name": "Fox 2000 Pictures",
      "origin_country": ""
    },
    {
      "id": 20555,
      "logo_path": null,
      "name": "Taurus Film",
      "origin_country": ""
    },
    {
      "id": 54050,
      "logo_path": null,
      "name": "Linson Films",
      "origin_country": ""
    },
    {
      "id": 54051,
      "logo_path": null,
      "name": "Atman Entertainment",
      "origin_country": ""
    },
    {
      "id": 54052,
      "logo_path": null,
      "name": "Knickerbocker Films",
      "origin_country": ""
    },
    {
      "id": 25,
      "logo_path": "/qZCc1lty5FzX30aOCVRBLzaVmcp.png",
      "name": "20th Century Fox",
      "origin_country": "US"
    }
  ],
  "production_countries": [
    {
      "iso_3166_1": "US",
      "name": "United States of America"
    }
  ],
  "release_date": "1999-10-12",
  "revenue": 100853753,
  "runtime": 139,
  "spoken_languages": [
    {
      "iso_639_1": "en",
      "name": "English"
    }
  ],
  "status": "Released",
  "tagline": "How much can you know about yourself if you've never been in a fight?",
  "title": "Fight Club",
  "video": false,
  "vote_average": 7.8,
  "vote_count": 3439
}
```

_Response (401 - BAD REQUEST)_
```json
{
  "status_message": "Invalid API key: You must be granted a valid key.",
  "success": false,
  "status_code": 7
}
```

_Response (404 - Not Found)_
```json
{
  "status_message": "The resource you requested could not be found.",
  "status_code": 34
}
```

## 7. `GET /movie-trending`
Description:
- Fetch a list of trending movies from the database

Request: 
- query: page (integer)

_Response (200 - OK)_
```json
{
  "page": 1,
  "results": [
    {
      "adult": false,
      "backdrop_path": "/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg",
      "genre_ids": [
        28,
        12,
        14,
        878
      ],
      "id": 299536,
      "original_language": "en",
      "original_title": "Avengers: Infinity War",
      "overview": "As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.",
      "poster_path": "/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
      "release_date": "2018-04-25",
      "title": "Avengers: Infinity War",
      "video": false,
      "vote_average": 8.3,
      "vote_count": 6937,
      "popularity": 358.799
    },
    {
      "adult": false,
      "backdrop_path": "/3P52oz9HPQWxcwHOwxtyrVV1LKi.jpg",
      "genre_ids": [
        28,
        35,
        878
      ],
      "id": 383498,
      "original_language": "en",
      "original_title": "Deadpool 2",
      "overview": "Wisecracking mercenary Deadpool battles the evil and powerful Cable and other bad guys to save a boy's life.",
      "poster_path": "/to0spRl1CMDvyUbOnbb4fTk3VAd.jpg",
      "release_date": "2018-05-15",
      "title": "Deadpool 2",
      "video": false,
      "vote_average": 7.6,
      "vote_count": 3938,
      "popularity": 223.011
    },
    {
      "adult": false,
      "backdrop_path": "/22cUd4Yg5euCxIwWzXrL4m4otkU.jpg",
      "genre_ids": [
        28,
        878,
        53
      ],
      "id": 500664,
      "original_language": "en",
      "original_title": "Upgrade",
      "overview": "A brutal mugging leaves Grey Trace paralyzed in the hospital and his beloved wife dead. A billionaire inventor soon offers Trace a cure — an artificial intelligence implant called STEM that will enhance his body. Now able to walk, Grey finds that he also has superhuman strength and agility — skills he uses to seek revenge against the thugs who destroyed his life.",
      "poster_path": "/adOzdWS35KAo21r9R4BuFCkLer6.jpg",
      "release_date": "2018-06-01",
      "title": "Upgrade",
      "video": false,
      "vote_average": 7.6,
      "vote_count": 138,
      "popularity": 32.969
    },
    {
      "adult": false,
      "backdrop_path": "/uZTtVdOEIwPA6vwVRI3217DoPM.jpg",
      "genre_ids": [
        35,
        10749
      ],
      "id": 466282,
      "original_language": "en",
      "original_title": "To All the Boys I've Loved Before",
      "overview": "Lara Jean's love life goes from imaginary to out of control when her secret letters to every boy she's ever fallen for are mysteriously mailed out.",
      "poster_path": "/hKHZhUbIyUAjcSrqJThFGYIR6kI.jpg",
      "release_date": "2018-08-17",
      "title": "To All the Boys I've Loved Before",
      "video": false,
      "vote_average": 8.4,
      "vote_count": 349,
      "popularity": 31.76
    },
    {
      "adult": false,
      "backdrop_path": "/yRXzrwLfB5tDTIA3lSU9S3N9RUK.jpg",
      "genre_ids": [
        35,
        18
      ],
      "id": 455980,
      "original_language": "en",
      "original_title": "Tag",
      "overview": "For one month every year, five highly competitive friends hit the ground running in a no-holds-barred game of tag they’ve been playing since the first grade. This year, the game coincides with the wedding of their only undefeated player, which should finally make him an easy target. But he knows they’re coming...and he’s ready.",
      "poster_path": "/eXXpuW2xaq5Aen9N5prFlARVIvr.jpg",
      "release_date": "2018-06-14",
      "title": "Tag",
      "video": false,
      "vote_average": 7,
      "vote_count": 285,
      "popularity": 87.194
    },
    {
      "backdrop_path": "/hHEqDPbO6z4Xje5tOf3Wm1mdMtI.jpg",
      "first_air_date": "2018-08-17",
      "genre_ids": [
        16,
        35,
        10765
      ],
      "id": 73021,
      "name": "Disenchantment",
      "origin_country": [
        "US"
      ],
      "original_language": "en",
      "original_name": "Disenchantment",
      "overview": "Set in a ruined medieval city called Dreamland, Disenchantment follows the grubby adventures of a hard-drinking princess, her feisty elf companion and her personal demon.",
      "poster_path": "/c3cUb0b3qHlWaawbLRC9DSsJwEr.jpg",
      "vote_average": 7.8,
      "vote_count": 8,
      "popularity": 19.929
    },
    {
      "adult": false,
      "backdrop_path": "/3ccBOsbVpgwN9K5whd2UB9ACebG.jpg",
      "genre_ids": [
        80,
        18
      ],
      "id": 489931,
      "original_language": "en",
      "original_title": "American Animals",
      "overview": "Four young men mistake their lives for a movie and attempt one of the most audacious heists in U.S. history.",
      "poster_path": "/aLbdKxgxuOPvs6CTlmzoOQ4Yg3j.jpg",
      "release_date": "2018-06-01",
      "title": "American Animals",
      "video": false,
      "vote_average": 7,
      "vote_count": 38,
      "popularity": 16.876
    },
    {
      "adult": false,
      "backdrop_path": "/tmpY6f0Lf7Dnx6inByjvHby4AYf.jpg",
      "genre_ids": [
        35
      ],
      "id": 454283,
      "original_language": "en",
      "original_title": "Action Point",
      "overview": "A daredevil designs and operates his own theme park with his friends.",
      "poster_path": "/5lqJx0uNKrD1cEKgaqF1LBsLAoi.jpg",
      "release_date": "2018-06-01",
      "title": "Action Point",
      "video": false,
      "vote_average": 5.3,
      "vote_count": 31,
      "popularity": 33.909
    },
    {
      "adult": false,
      "backdrop_path": "/cS6S6OcvcAjx0aBzvHPy1Sm4Snj.jpg",
      "genre_ids": [
        18,
        14,
        27,
        53
      ],
      "id": 421792,
      "original_language": "en",
      "original_title": "Down a Dark Hall",
      "overview": "Kitt Gordy, a new student at the exclusive Blackwood Boarding School, confronts the institution's supernatural occurrences and dark powers of its headmistress.",
      "poster_path": "/wErHaJrD1QZ2FEVneH6w0GZUz2L.jpg",
      "release_date": "2018-08-01",
      "title": "Down a Dark Hall",
      "video": false,
      "vote_average": 5.5,
      "vote_count": 30,
      "popularity": 11.162
    },
    {
      "adult": false,
      "backdrop_path": "/64jAqTJvrzEwncD3ARZdqYLcqbc.jpg",
      "genre_ids": [
        12,
        53,
        10749
      ],
      "id": 429300,
      "original_language": "en",
      "original_title": "Adrift",
      "overview": "A true story of survival, as a young couple's chance encounter leads them first to love, and then on the adventure of a lifetime as they face one of the most catastrophic hurricanes in recorded history.",
      "poster_path": "/5gLDeADaETvwQlQow5szlyuhLbj.jpg",
      "release_date": "2018-05-31",
      "title": "Adrift",
      "video": false,
      "vote_average": 6.4,
      "vote_count": 170,
      "popularity": 49.661
    },
    {
      "adult": false,
      "backdrop_path": "/gRtLcCQOpYUI9ThdVzi4VUP8QO3.jpg",
      "genre_ids": [
        18,
        36,
        10752
      ],
      "id": 857,
      "original_language": "en",
      "original_title": "Saving Private Ryan",
      "overview": "As U.S. troops storm the beaches of Normandy, three brothers lie dead on the battlefield, with a fourth trapped behind enemy lines. Ranger captain John Miller and seven men are tasked with penetrating German-held territory and bringing the boy home.",
      "poster_path": "/miDoEMlYDJhOCvxlzI0wZqBs9Yt.jpg",
      "release_date": "1998-07-24",
      "title": "Saving Private Ryan",
      "video": false,
      "vote_average": 8,
      "vote_count": 6840,
      "popularity": 15.153
    },
    {
      "adult": false,
      "backdrop_path": "/aOQjLmHGuFy3hsY26QDIctxjMol.jpg",
      "genre_ids": [
        18,
        53
      ],
      "id": 470918,
      "original_language": "en",
      "original_title": "Beast",
      "overview": "A troubled woman living in an isolated community finds herself pulled between the control of her oppressive family and the allure of a secretive outsider suspected of a series of brutal murders.",
      "poster_path": "/kZdncyp1IKhEqwv5zdmUpK5Dc7S.jpg",
      "release_date": "2018-04-18",
      "title": "Beast",
      "video": false,
      "vote_average": 6.9,
      "vote_count": 19,
      "popularity": 2.492
    },
    {
      "id": 353081,
      "video": false,
      "vote_count": 952,
      "vote_average": 7.5,
      "title": "Mission: Impossible - Fallout",
      "release_date": "2018-07-25",
      "original_language": "en",
      "original_title": "Mission: Impossible - Fallout",
      "genre_ids": [
        28,
        12,
        53
      ],
      "backdrop_path": "/5qxePyMYDisLe8rJiBYX8HKEyv2.jpg",
      "adult": false,
      "overview": "When an IMF mission ends badly, the world is faced with dire consequences. As Ethan Hunt takes it upon himself to fulfil his original briefing, the CIA begin to question his loyalty and his motives. The IMF team find themselves in a race against time, hunted by assassins while trying to prevent a global catastrophe.",
      "poster_path": "/AkJQpZp9WoNdj7pLYSj1L0RcMMN.jpg",
      "popularity": 139.023
    },
    {
      "adult": false,
      "backdrop_path": "/kNAzo7icHdFkF43JQa18mPEUtvf.jpg",
      "genre_ids": [
        12,
        16,
        14
      ],
      "id": 271706,
      "original_language": "zh",
      "original_title": "大魚海棠",
      "overview": "Beyond the human realm, there is a magical race of beings who control the tides and the changing of the seasons. One of these beings, a young girl named Chun, seeks something more—she wants to experience the human world! At sixteen, she finally gets her chance and transforms into a dolphin in order to explore the world that has her fascinated. But she soon discovers that it’s a dangerous place and nearly gets killed in a vortex. Luckily, her life is spared when a young boy sacrifices himself to save her. Moved by his kindness and courage, she uses magic to bring him back to life only to learn that this power comes at a serious price. On a new adventure, she’ll have to make her own sacrifices in order to protect his soul until it is ready to return to the human world.",
      "poster_path": "/fRCdXh9MZutj1JJPZlUXMex6AuB.jpg",
      "release_date": "2016-07-08",
      "title": "Big Fish & Begonia",
      "video": false,
      "vote_average": 6.9,
      "vote_count": 30,
      "popularity": 7.424
    },
    {
      "original_name": "Game of Thrones",
      "id": 1399,
      "name": "Game of Thrones",
      "vote_count": 4772,
      "vote_average": 8.2,
      "first_air_date": "2011-04-17",
      "poster_path": "/gwPSoYUHAKmdyVywgLpKKA4BjRr.jpg",
      "genre_ids": [
        18,
        10759,
        10765
      ],
      "original_language": "en",
      "backdrop_path": "/gX8SYlnL9ZznfZwEH4KJUePBFUM.jpg",
      "overview": "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.",
      "origin_country": [
        "US"
      ],
      "popularity": 61.91
    },
    {
      "adult": false,
      "backdrop_path": "/5a7lMDn3nAj2ByO0X1fg6BhUphR.jpg",
      "genre_ids": [
        12,
        14,
        878
      ],
      "id": 333339,
      "original_language": "en",
      "original_title": "Ready Player One",
      "overview": "When the creator of a popular video game system dies, a virtual contest is created to compete for his fortune.",
      "poster_path": "/pU1ULUq8D3iRxl1fdX2lZIzdHuI.jpg",
      "release_date": "2018-03-28",
      "title": "Ready Player One",
      "video": false,
      "vote_average": 7.7,
      "vote_count": 3673,
      "popularity": 68.153
    },
    {
      "adult": false,
      "backdrop_path": "/wWoCid7YUxiLhq3ZZT6CtFEDPXw.jpg",
      "genre_ids": [
        28
      ],
      "id": 347375,
      "original_language": "en",
      "original_title": "Mile 22",
      "overview": "A CIA field officer and an Indonesian police officer are forced to work together in confronting political corruption. An informant must be moved twenty-two miles to safety.",
      "poster_path": "/2L8ehd95eSW9x7KINYtZmRkAlrZ.jpg",
      "release_date": "2018-08-10",
      "title": "Mile 22",
      "video": false,
      "vote_average": 6,
      "vote_count": 8,
      "popularity": 30.064
    },
    {
      "backdrop_path": "/okhLwP26UXHJ4KYGVsERQqp3129.jpg",
      "first_air_date": "2015-08-23",
      "genre_ids": [
        18,
        27
      ],
      "id": 62286,
      "name": "Fear the Walking Dead",
      "origin_country": [
        "US"
      ],
      "original_language": "en",
      "original_name": "Fear the Walking Dead",
      "overview": "What did the world look like as it was transforming into the horrifying apocalypse depicted in \"The Walking Dead\"? This spin-off set in Los Angeles, following new characters as they face the beginning of the end of the world, will answer that question.",
      "poster_path": "/gAEZitvNudXr9kphSd4XOlOkjPX.jpg",
      "vote_average": 6.4,
      "vote_count": 791,
      "popularity": 44.477
    },
    {
      "adult": false,
      "backdrop_path": "/bLJTjfbZ1c5zSNiAvGYs1Uc82ir.jpg",
      "genre_ids": [
        28,
        12,
        14
      ],
      "id": 338970,
      "original_language": "en",
      "original_title": "Tomb Raider",
      "overview": "Lara Croft, the fiercely independent daughter of a missing adventurer, must push herself beyond her limits when she finds herself on the island where her father disappeared.",
      "poster_path": "/3zrC5tUiR35rTz9stuIxnU1nUS5.jpg",
      "release_date": "2018-03-05",
      "title": "Tomb Raider",
      "video": false,
      "vote_average": 6.3,
      "vote_count": 2530,
      "popularity": 44.164
    },
    {
      "id": 345940,
      "video": false,
      "vote_count": 310,
      "vote_average": 6.3,
      "title": "The Meg",
      "release_date": "2018-08-09",
      "original_language": "en",
      "original_title": "The Meg",
      "genre_ids": [
        28,
        27,
        878,
        53
      ],
      "backdrop_path": "/ibKeXahq4JD63z6uWQphqoJLvNw.jpg",
      "adult": false,
      "overview": "A deep sea submersible pilot revisits his past fears in the Mariana Trench, and accidentally unleashes the seventy foot ancestor of the Great White Shark believed to be extinct.",
      "poster_path": "/xqECHNvzbDL5I3iiOVUkVPJMSbc.jpg",
      "popularity": 198.941
    }
  ],
  "total_pages": 792,
  "total_results": 15831
}
```

_Response (401 - BAD REQUEST)_
```json
{
  "status_message": "Invalid API key: You must be granted a valid key.",
  "success": false,
  "status_code": 7
}
```

_Response (404 - Not Found)_
```json
{
  "status_message": "The resource you requested could not be found.",
  "status_code": 34
}
```

## 8. `POST /reviews/add/:MovieId`
Description:
- Post a new review

Request:

- headers:
```json
{
  "access_token": "string"
}
```

- Params:
```json
{
    "MovieId": "MovieId"
}
```

- Body:
```json
{
    "review": "string"
}
```

_Response (201 - Created)_
```json
{
    "review": "string"
}
```

_Response (403 - Bad Request)_
``` json
{
    "message": "Object"
}
```

## 9. `PATCH /reviews/add/:MovieId`
Description: 
- Update a data of a review from database

Request:

- Headers:
```json
{
    "access_token": "string"
}
```

- Params:
```json
{
    "MovieId": "integer"
}
```

- Body:
```json
{
    review: "string"
}
```

_Response (201 - Created)_
```json
{
    "review": "string"
}
```

_Response (500 - Internal Server Error)_
```json
{
    "message": "Object"
}
```

## 10. `DELETE /reviews/delete/:MovieId`
Description:
- Delete a review from database

Request:

- Headers:
```json
{
    "access_token": "string"
}
```

- Params:
```json
{
    "MovieId": "integer"
}
```

_Response (200 - OK)_
```json
1
```

_Response (500 - Internal Server Error)_
```json
{
    "message": "Object"
}
```