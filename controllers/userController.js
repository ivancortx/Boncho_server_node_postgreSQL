const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Cart } = require('../models/models')
const {validationResult} = require('express-validator')
const {userService} = require('../service/user-service')

const generateJWT = (id, email, role) => {
  return jwt.sign(
    { id, email, role },
    process.env.SECRET_KEY,
    { expiresIn: '24h' }
  )
}

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest('Ошибка при валидации', errors.array()))  //если ошибки есть то передаем их в errorsMiddleware
      }

      const { email, password, role } = req.body

      const userData = await userService.registration(email, password, role)

      //httpOnly: true - cookie нельзя будет изменить внутри браузера
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

      return res.json(userData)

    }catch (e) {
      next(e)
    }
  }

  async login(req, res, next) {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return next(ApiError.internal('Пользователь не найден'))
    }

    const hashPassword = bcrypt.compareSync(password, user.password)
    if (!hashPassword) {
      return next(ApiError.internal('Пароль не совпадает'))
    }

    const token = generateJWT(user.id, email, user.role)
    return res.json({ token })
  }

  async check(req, res, next) {
    const token = generateJWT(req.user.id, req.user.email, req.user.role)
    console.log(req.user)
    return res.json({ token })
  }
}

module.exports = new UserController()