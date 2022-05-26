const { User, Post } = require('../models/index')

class PostController{
  static async addPost(request, response, next) {
    try {
      const {imgUrl, description} = request.body

      const newPost = await Post.create({
        imgUrl: imgUrl,
        description: description
      })

      response.status(201).json({
        message: 'Posting is successfully.'
      })
    } catch (err) {
      next(err)
    }
  }
}