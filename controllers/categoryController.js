const {Category} = require('../models/models')
const ApiError = require('../error/ApiError')

class CategoryController {
  async create(req, res, next) {
   try {
     const {name} = req.body
     const categoryCandidat = await Category.findOne({where: {name}})
     if (categoryCandidat) {
       throw ApiError.forbidden('Такая категория уже существует}')
     }
     console.log('ddd')
     const category = await Category.create({name})
     return res.json(category)
   } catch (e) {
     next(e)
   }
  }

  async getAll(req, res, next) {
    try {
      const types = await Category.findAll()
      return res.json(types)
    }catch (e) {
      next(e)
    }
  }
}

module.exports = new CategoryController()