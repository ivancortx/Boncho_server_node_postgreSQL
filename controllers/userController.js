const ApiError = require('../error/ApiError')
const {validationResult} = require('express-validator')
const userService = require('../service/user-service')

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
    try {
      const {email, password} = req.body
      const userData = await userService.login(email, password)

      //httpOnly: true - cookie нельзя будет изменить внутри браузера
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

      return res.json({ accessToken: userData.accessToken, user: userData.user })
    }catch (e) {
      next(e)
    }
  }

  async logout (req, res, next) {
    try {
      const {refreshToken} = req.cookies
      const token = await userService.logout(refreshToken)
      res.clearCookie('refreshToken')  //уераем токен из куки
      return res.json(token)  //*для наглядности
    }catch (e) {
      next(e)
    }
  }

  async refresh (req, res, next) {
    try {
      const {refreshToken} = req.cookies
      const userData = await userService.refresh(refreshToken)
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json({ accessToken: userData.accessToken, user: userData.user })
    }catch (e) {
      next(e)
    }
  }
}

module.exports = new UserController()