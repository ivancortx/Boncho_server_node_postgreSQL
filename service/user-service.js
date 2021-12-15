const { User } = require('../models/models')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail-service')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')
const ApiError = require('../error/ApiError')

class UserService {
  async registration(email, password, role) {

    const candidate = await User.findOne({where: {email: email}})

    if (candidate) {
      throw ApiError.badRequest(`Пользователь с почтовым ящиком ${email} уже существует`)
    }

    const hashPassword = await bcrypt.hash(password, 3)
    const activationLink = uuid.v4() //генерируем ссылку для активации
    const user = await User.create({ email, password: hashPassword, activationLink, role })  //сохраняем user-а в БД

    //отправляем на указаную почту ссылку с кл активации
    // await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`)

    const userDto = new UserDto(user.dataValues) // id, email, isActivated

    const tokens = tokenService.generateToken({ ...userDto })

    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens, // accessToken, refreshToken
      user: userDto  // id, email, isActivated
    }
  }

  async activate(activationLink) {
    const user = await User.findOne({where: { activationLink }})
    if (!user) {
      throw ApiError.badRequest('Некоректная ссылка активации')
    }
    user.isActivated = true
    await user.save()
  }

  async login(email, password) {
    const user = await User.findOne({where: { email }})
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
}

module.exports = new UserService()