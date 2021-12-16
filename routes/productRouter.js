const Router = require('express')
const router = new Router()
const ProductController = require('../controllers/productController')

router.post('/', ProductController.create)
router.get('/', ProductController.getAll)
router.get('/get-one', ProductController.getOne)

module.exports = router