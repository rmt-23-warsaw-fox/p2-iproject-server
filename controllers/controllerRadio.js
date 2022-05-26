const axios = require('axios');
require('dotenv').config()

class ControllerRadio {

  static async getAllRadio(req, res, next) {

    try {

      let { votes, radioName, page } = req.query
       
      console.log(req.query,'<<<<<<<<<<<');
      let options = {
        method: 'GET',
        url: 'https://radio-browser.p.rapidapi.com/json/stations/search',
        params: {
          country: 'Indonesia',
          reverse: 'false',
          offset: page * 10,
          limit: '200',
          hidebroken: 'false'
        },
        headers: {
          'X-RapidAPI-Host': 'radio-browser.p.rapidapi.com',
          'X-RapidAPI-Key': process.env.API_KEY
        }
      };
      
      if (radioName) {
        options.params = {
          ...options.params,
          name: radioName,
        }
      }

      if (votes === 'desc') {
        options.params = {
          ...options.params,
          order: 'votes',
          reverse: 'true',
        }
      }

      if (votes === 'asc') {
        options.params = {
          ...options.params,
          order: 'votes',
        }
      }

      console.log(options);
      const response = await axios.request(options)

      let temp = response.data.map((el, i) => {
        let data = {
          stationId: el.stationuuid,
          name: el.name,
          url: el.url,
          tags: el.tags,
          country: el.country,
          state: el.state,
          votes: el.votes,
          lat: el.geo_lat,
          long: el.geo_long,
          icon: el.favicon
        };
        return data
      })

      // let start = page * 10
      let end = 0 + 10
      let data = temp.slice(0, end)
      // console.log(temp.length);
      res.status(200).json({
        totalPage: 15,
        data,
      });

    } catch (err) {

      next(err)

    }
  }

  static async getRadioById(req, res, next) {
    try {
      const { stationId } = req.params

      const options = {
        method: 'GET',
        url: 'https://radio-browser.p.rapidapi.com/json/stations/byuuid',
        params: { uuids: stationId },
        headers: {
          'X-RapidAPI-Host': 'radio-browser.p.rapidapi.com',
          'X-RapidAPI-Key': process.env.API_KEY
        }
      };

      const response = await axios.request(options)

      let result = response.data.map(el => {
        let data = {
          stationId: el.stationuuid,
          name: el.name,
          url: el.url,
          tags: el.tags,
          country: el.country,
          state: el.state,
          votes: el.votes,
          lat: el.geo_lat,
          long: el.geo_long,
          icon: el.favicon
        };
        return data
      })

      res.status(200).json(result);

    } catch (err) {

      next(err)

    }
  }
  //get artist name, song title or album
  static async getSong(req, res, next) {
    try {
      let { artist } = req.body
      let options = {
        method: 'GET',
        url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
        params: { q: artist },
        headers: {
          'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
          'X-RapidAPI-Key': process.env.API_KEY
        }
      };

      const temp = await axios.request(options)
      // console.log(temp.data.data);
      let result = temp.data.data.map(el => {
        let artist = {
          id: el.id,
          name: el.artist.name,
          title: el.title,
          url: el.preview,
          icon: el.artist.picture_medium,
          album: el.album.title.slice(0, 20)
        }
        return artist
      })

      console.log(result);

      res.status(200).json(result);

    } catch (err) {

      next(err)

    }
  }

  static async getSongById(req, res, next) {
    try {

      const { id } = req.params
      // console.log(id);
      const options = {
        method: 'GET',
        url: `https://deezerdevs-deezer.p.rapidapi.com/track/${id}`,
        headers: {
          'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
          'X-RapidAPI-Key': process.env.API_KEY
        }
      };

      const temp = await axios.request(options)
      console.log(temp.data);
      let result = {
        id: temp.data.id,
        name: temp.data.artist.name,
        title: temp.data.title,
        url: temp.data.preview,
        icon: temp.data.artist.picture_medium,
        album: temp.data.album.title.slice(0, 10),
        realeaseDate: temp.data.album.release_date
      }

      res.status(200).json(result)

    } catch (err) {

      next(err)

    }
  }

  static async getRadioPosition(req, res, next) {
    try {
      let options = {
        method: 'GET',
        url: 'https://radio-browser.p.rapidapi.com/json/stations/search',
        params: {
          country: 'Indonesia',
          reverse: 'false',
          offset: 0,
          limit: '155',
          hidebroken: 'false'
        },
        headers: {
          'X-RapidAPI-Host': 'radio-browser.p.rapidapi.com',
          'X-RapidAPI-Key': process.env.API_KEY
        }
      }
      const response = await axios.request(options)
      let temp = []
      response.data.forEach((el) => {
        if(el.geo_lat && el.geo_long){
          let data = {
            stationId: el.stationuuid,
            name: el.name,
            lat: el.geo_lat,
            lng: el.geo_long,
            icon: el.favicon
          };
          temp.push(data)
        }
      })
      
      res.status(200).json({
        totalPage: 15,
        data: temp,
      })

    } catch (err) {
      next(err)
    }
  }
}

module.exports = ControllerRadio