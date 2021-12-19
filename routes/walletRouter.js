const Router = require('express')
const router = new Router()
const WalletController = require('../controllers/WalletController')
const AuthMiddleWare = require('../middleware/authMiddleware')

router.post('/', AuthMiddleWare, WalletController.pushCash)
router.get('/', AuthMiddleWare, WalletController.seeCash)

module.exports = router