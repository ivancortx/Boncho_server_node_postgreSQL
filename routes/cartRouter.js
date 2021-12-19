const Router = require('express')
const router = new Router()
const CartController = require('../controllers/CartController')
const AuthMiddleWare = require('../middleware/authMiddleware')

router.post('/', AuthMiddleWare, CartController.addToCart)
router.get('/', AuthMiddleWare, CartController.getAll)

module.exports = router