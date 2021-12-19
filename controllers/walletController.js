const WalletService = require('../service/wallet-service')
const ApiError = require('../error/ApiError')

class CartController {
  async pushCash(req, res, next) {
    try {
      const { id } = req.user
      const { cash } = req.body
      await WalletService.putCash(id, cash)
      const userWallet = await WalletService.findCash(id)
      res.json(userWallet)

    } catch (e) {
      next(ApiError.internal(e.message))
    }
  }

  async seeCash(req, res, next) {
    try {
      const { id } = req.user
      const userWallet = await WalletService.findCash(id)
      res.json(userWallet)

    } catch (e) {
      next(ApiError.internal(e.message))
    }
  }
}

module.exports = new CartController()