const { User, Post, Like } = require('../models/index')
const { Op } = require("sequelize");

class LikeController {
  static async addLike(request, response, next) {
    try {
      const additionalData = request.additionalData
      const {id} = request.body

      const foundPost = await Post.findByPk(+id)

      if (foundPost === null) {
        throw new Error('post_not_found')
      }

      const foundSameLike = await Like.findOne({
        where: {
          [Op.and]: [{UserId: +additionalData.id}, {PostId: foundPost.id}]
        }
      })

      if (foundSameLike !== null) {
        throw new Error('liked')
      }

      const likes = await Like.create({
        UserId: +additionalData.id,
        PostId: +id
      })

      response.status(201).json({
        message: "Like is successfully."
      })
    } catch (err) {
      next(err)
    }
  }

  static async unlike(request, response, next) {
    try {
      const additionalData = request.additionalData
      const {id} = request.params

      const foundLike = await Like.findOne({
        where: {
          [Op.and]: [{UserId: +additionalData.id}, {PostId: +id}]
        }
      })

      if (foundLike === null) {
        throw new Error('like_not_found')
      }

      await Like.destroy({
        where: {
          [Op.and]: [{UserId: +additionalData.id}, {PostId: +id}]
        }
      })

      response.status(200).json({
        message: 'Post has been unliked.'
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = {LikeController}