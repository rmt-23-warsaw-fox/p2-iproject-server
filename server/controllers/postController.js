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

  static async fetchPosts(request, response, next) {
    try {
      const posts = await Post.findAll()

      response.status(200).json({
        posts
      })
    } catch (err) {
      next(err)
    }
  }

  static async deletePost(request, response, next) {
    try {
      const idPost = request.params.id

      const foundPost = await Post.findOne({
        where: {
          id: +idPost
        }
      })

      if (foundPost === null) {
        throw new Error('post_not_found')
      }

      await Post.destroy({
        where: {
          id: +idPost
        }
      })

      response.status(200).json({
        message: 'Post has been deleted.'
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = {PostController}