const { Product } = require('../models/models')
const ApiError = require('../error/ApiError')

class ProductService {
  async addProduct(name, description, startDate, endDate, priceStep, img, percentTimeStep,
                     categoryId, seePrice, startPrice, stepTime, authorEmail) {
     const product = await Product.create({
       name, description, startDate, endDate, priceStep, img, percentTimeStep,
       categoryId, seePrice, startPrice, stepTime, authorEmail
     })
     return product
  }

  async getAll() {
    const products = await Product.findAll()
    if (!products) {
      throw ApiError.badRequest('Товаров нет')
    }
    return products
  }

  async getOne(productId) {
    const products = await Product.findOne({where: {
      id: productId
      }})
    if (!products) {
      throw ApiError.badRequest('Товар не обнаружен')
    }
    return products
  }
}

module.exports = new ProductService()