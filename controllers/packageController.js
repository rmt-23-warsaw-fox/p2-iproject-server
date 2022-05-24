
const {Package, User, Major, Buy} = require('../models/index')
const { Op } = require("sequelize");

class PackageController {

  static async products(req, res, next) {
    try {
      let offsetFilter = 0
      let item = []
      const { offset, major, title} = req.query
      if(offset) {
        offsetFilter = offset
      }
      
      if(major) {
        item.push({MajorId: major})
      }

      if(title) {
        item.push({title: {[Op.iLike]: `%${title}%`}})
      }
      let filter = {[Op.and]: item, status: 'active'}
      const products = await Package.findAndCountAll({
        limit: 9,
        offset: offsetFilter,
        where: filter,
        include: [Buy]
      })
      res.status(200).json({
        statusCode: 200,
        data: products
      })
    } catch(err) {
      next(err)
    }
  }

  static async major(req, res, next) {
    try {
      const major = await Major.findAll()
      res.status(200).json({
        statusCode: 200,
        data: major
      })
    } catch(err) {
      next(err)
    }
  }

  static async buy(req, res, next) {
    try {
      const {id} = req.params
      if(req.data.role !== 'customer') {
        throw new Error(403)
      }
      const findPackage = await Package.findByPk(id)

      if(!findPackage) {
        throw new Error(404)
      }

      const newBuy = await Buy.create({
        PackageId : id,
        UserId : req.data.id
      })
      res.status(200).json({
        statusCode: 200,
        data: newBuy
      })
    } catch(err) {
      next(err)
    }
  }

  static async listBuy(req, res, next) {
    try {
      const {id} = req.data

      const findUser = await User.findOne({
        where: {
          id
        },
        include: [{
          model: Buy,
          include: [Package]
        }]
      })
      res.status(200).json({
        statusCode: 200,
        data: findUser
      })
    } catch(err) {
      next(err)
    }
  }

  static async id(req, res, next) {
    try {
    const {id} = req.params
    const package = await Package.findOne({
      where: {
        id
      },
      include: [User, Major]
    })

    if (!package) {
      throw new Error('404')
    }
    res.status(200).json({
      statusCode: 200,
      data: package
    })
    } catch(err) {
      next(err)
    }
  }

}

module.exports = PackageController