const CartService = require('../service/cart-service')
const ApiError = require('../error/ApiError')

class CartController {
  async addToCart(req, res, next) {
   try {
     //Создаём или ищем корзину
     const { id } = req.user
     const { productId } = req.body
     const userCart = await CartService.createCart(id)

     //Добавляем товар в корзину
     const productInCart = await CartService.addProductToCart(productId, userCart.id)
     res.json(productInCart)

   } catch (e) {
     next(ApiError.internal(e.message))
   }
  }

  async getAll(req, res, next) {
    try {
      const user = req.user
      const products = await CartService.getAllProductsFromCart(user.id)
      res.json(products)

    } catch (e) {
      next(ApiError.internal(e.message))
    }
  }
}

module.exports = new CartController()