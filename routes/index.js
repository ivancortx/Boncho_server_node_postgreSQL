const Router = require('express')
const router = new Router()

const userRouter = require('./userRouter')
const categoryRouter = require('./categoryRouter')
const productRouter = require('./productRouter')
const cartRouter = require('./cartRouter')
const walletRouter = require('./walletRouter')

router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/product', productRouter)
router.use('/cart', cartRouter)
router.use('/wallet', walletRouter)

module.exports = router