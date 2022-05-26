const { User, Post } = require('../models/index')

class PostController{
  static async addPost(request, response, next) {
    try {
      const {imgUrl, description} = request.body
      const additionalData = request.additionalData

      console.log(additionalData.id);

      const newPost = await Post.create({
        imgUrl: imgUrl,
        description: description,
        UserId: additionalData.id
      })

      response.status(201).json({
        message: 'New post has been added.'
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = {PostController}