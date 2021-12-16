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

  async login(email, password) {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      throw ApiError.badRequest('Юзер не найден')
    }

    const isPassEquals = await bcrypt.compare(password, user.password)
    if (!isPassEquals) {
      throw ApiError.badRequest('пароль не совпадает')
    }

    const userDto = new UserDto(user)
    const tokens = tokenService.generateToken({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens, // accessToken, refreshToken
      user: userDto  // id, email, isActivated
    }
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken)
    return token
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError()
    }

    //валидируем токен который пришел с фронта
    const userData = tokenService.validateRefreshToken(refreshToken)
    //получаем токен с БД
    const tokenFromDb = await tokenService.findToken(refreshToken)
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError()
    }

    //обновляем данные пользователя
    const user = await User.findOne({
      where: {
        id: userData.id
      }
    })

    const userDto = new UserDto(user)

    //генерируем новые токены
    const tokens = tokenService.generateToken({ ...userDto })

    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return { ...tokens, user: userDto }
  }
}

module.exports = new ProductService()