const Router = require('express')
const router = new Router()
const CategoryController = require('../controllers/categoryController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', CategoryController.create)
router.get('/', CategoryController.getAll)

module.exports = router