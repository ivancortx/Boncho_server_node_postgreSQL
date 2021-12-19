const { Wallet } = require('../models/models')
const ApiError = require('../error/ApiError')

class WalletService {
  async putCash(userId, cash) {
    //находим кошелек и изменяем
    await Wallet.findOne({ where: { userId } })
      .then((walletDb) => {
        walletDb.cash = walletDb.cash + cash
        walletDb.save()
          .then((result) => {
            return result
          })
      })
  }

  async findCash(userId) {
    const userWallet = await Wallet.findOne({ where: { userId } })
    return userWallet
  }
}

module.exports = new WalletService()