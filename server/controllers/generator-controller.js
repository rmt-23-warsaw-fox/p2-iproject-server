const axios = require('axios')

class Controller{
  
  static async getRandomJoke(req, res, next){
    try {
      const response = await axios.get("https://icanhazdadjoke.com/",   
        {
          headers: {
            Accept: "application/json",
            "User-Agent": "axios 0.21.1"
          }
        }
      )
      res.status(200).json(response.data)
    } catch (error) {
      next(error)
    }
  }

}


module.exports = Controller