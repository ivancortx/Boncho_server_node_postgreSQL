const uuid = require('uuid')
const path = require('path')
const ProductService = require('../service/product-service')
const ApiError = require('../error/ApiError')

class ProductController {
  async create(req, res, next) {
    try {
      let {
        name, description, startDate, endDate, priceStep, img, percentTimeStep, categoryId, seePrice, startPrice,
        stepTime, authorEmail
      } = req.body
      // const {img} = req.files
      // let fileName = uuid.v4() + '.jpg' //генерируем уникальное имя для картинки
      // img.mv(path.resolve(__dirname, '..', 'static', fileName)) //запишем картинку в указанную папку
      const product = await ProductService.addProduct(name, description, startDate, endDate, priceStep, img, percentTimeStep,
        categoryId, seePrice, startPrice, stepTime, authorEmail)
      return res.json(product)
    } catch (e) {
      next(ApiError.internal(e.message))
    }
  }

  async getAll(req, res, next) {
    console.log(req.params)
    try {
      const products = await ProductService.getAll()
      return res.json(products)
    }catch (e) {
      next(ApiError.internal(e.message))
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.body
      const product = await ProductService.getOne(id)
      return res.json(product)
    } catch (e) {
      next(ApiError.internal(e.message))
    }
  }
}

module.exports = new ProductController()