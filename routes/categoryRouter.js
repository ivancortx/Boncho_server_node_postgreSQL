const Router = require('express')
const router = new Router()
const CategoryController = require('../controllers/categoryController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', checkRoleMiddleware("ADMIN"), CategoryController.create)
router.get('/', CategoryController.getAll)

module.exports = router