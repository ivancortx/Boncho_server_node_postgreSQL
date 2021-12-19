const { Cart } = require('../models/models')
const { CartProduct } = require('../models/models')
const ApiError = require('../error/ApiError')

class CartService {
  async createCart(userId) {
    //Проверим есть ли уже созданная корзина
    const cartCandidate = await Cart.findOne({ where: { userId } })
    if (cartCandidate) return cartCandidate

    //Если корзины нет то создадим её
    const userCart = await Cart.create({ userId })
    return userCart
  }

  async addProductToCart(productId, cartId) {
    //Проверим, может этот товар уже есть в корзине
    const candidateCartProduct = await CartProduct.findOne({where: {productId}})
    if (candidateCartProduct) throw ApiError.internal('Данный товар уже в корзине.')

    //Добавим товар в корзину
    const cartProduct = await CartProduct.create({productId, cartId})
    return cartProduct
  }

  async getAllProductsFromCart(userId) {
    //Ищем корзину, что б получить её id
    const userCart = await Cart.findOne({where: {userId}})
    if (!userCart) throw ApiError.badRequest('Товаров нет')

    //если корзина нашлась, ищем продукты в ней
    const products = await CartProduct.findAll({where: {cartId: userCart.id}})
    if (!products) {
      throw ApiError.badRequest('Товаров нет')
    }
    return products
  }
}

module.exports = new CartService()