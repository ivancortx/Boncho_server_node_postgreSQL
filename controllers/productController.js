const uuid = require('uuid')
const path = require('path')
const {Product} = require('../models/models')
const ApiError = require('../error/ApiError')

class ProductController {
  async create(req, res, next) {
    try {
      let {name, description, startDate, endDate, priceStep, img, percentTimeStep, categoryId, seePrice, startPrice,
            stepTime, authorEmail} = req.body
      // const {img} = req.files
      // let fileName = uuid.v4() + '.jpg' //генерируем уникальное имя для картинки
      // img.mv(path.resolve(__dirname, '..', 'static', fileName)) //запишем картинку в указанную папку
      const product = await Product.create({name, description, startDate, endDate, priceStep, img, percentTimeStep,
        categoryId, seePrice, startPrice, stepTime, authorEmail})

      // if (info) {
      //   info = JSON.parse(info)  //string -> object
      //   info.forEach(i => DeviceInfo.create({
      //     title: i.title,
      //     description: i.description,
      //     deviceId: device.id
      //   }))
      // }

      return res.json(product)
    } catch (e) {
      next(ApiError(e.message))
    }
  }

  async getAll(req, res) {
    let {brandId, typeId, limit, page} = req.query

    // постраничный вывод
    page = page || 1
    limit = limit || 9
    let offset = page * limit - limit  //отступ

    let devices
    if (!brandId && !typeId) {
      devices = await Device.findAndCountAll({limit, offset})
    }
    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({where: {brandId}, limit, offset})
    }
    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({where: {typeId}, limit, offset})
    }
    if (brandId && typeId) {
      devices = await Device.findAndCountAll({where: {typeId, brandId}, limit, offset})
    }

    res.json(devices)
  }

  async getOne(req, res) {
    const {id} = req.params
    console.log(id)
    const device = await Device.findOne(
        {
          where: {id},
          include: [{model: DeviceInfo, as: 'info'}]
        },
    )

    return res.json(device)
  }
}

module.exports = new ProductController()