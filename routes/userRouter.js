const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const { body } = require('express-validator')

router.post('/registration',
  body('email').isEmail(),  //middleware validation
  body('password').isLength({ min: 3, max: 15 }),  //middleware validation userController.registration)
  userController.registration)

router.post('/login', userController.login)
router.get('/refresh', authMiddleware, userController.refresh)
router.get('/logout', userController.logout)


module.exports = router