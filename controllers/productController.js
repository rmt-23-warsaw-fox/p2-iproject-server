const { Product, User, Order, Category } = require("../models");

class productController {
  static async getProduct(req, res, next) {
    try {
      const products = await Product.findAll({
        include: Category,
      });
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }
  static async addProduct(req, res, next) {
    try {
      const { name, imageUrl, price, description, stock, CategoryId } =
        req.body;
      const newProduct = await Product.create({
        name,
        imageUrl,
        price,
        description,
        stock,
        CategoryId,
      });
      res.status(201).json(newProduct);
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }
  static async updateProduct(req, res, next) {
    try {
      const id = req.params.id;
      const { name, imageUrl, price, description, stock, CategoryId } =
        req.body;
      const newProduct = await Product.update(
        {
          name,
          imageUrl,
          price,
          description,
          stock,
          CategoryId,
        },
        {
          where: {
            id,
          },
        }
      );
      // console.log(newProduct);
      if (newProduct[0] === 0) {
        throw new Error("Product not found");
      }
      res.status(200).json({
        message: "Product updated",
      });
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }
  static async updateStock(req, res, next) {
    try {
      const id = req.params.id;
      const { stock } = req.body;
      const updatedStock = await Product.update(
        {
          stock,
        },
        {
          where: {
            id,
          },
        }
      );
      if (updatedStock[0] === 0) {
        throw new Error("Product not found");
      }
      res.status(200).json({
        message: "Stock updated",
      });
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }
  static async deleteProduct(req, res, next) {
    try {
      const id = req.params.id;
      const deletedProduct = await Product.destroy({
        where: {
          id,
        },
      });
      // console.log(deletedProduct);
      if (deletedProduct === 0) {
        throw new Error("Product not found");
      }
      res.status(200).json({
        message: "Product deleted",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = productController;
