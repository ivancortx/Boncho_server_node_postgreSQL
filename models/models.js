const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING},
  isActivate: {type: DataTypes.BOOLEAN, defaultValue: false},
  activationLink: {type: DataTypes.STRING, defaultValue: ''},
  role: {type: DataTypes.STRING, defaultValue: 'USER'}
})

const Token = sequelize.define('token', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  userId: {type: DataTypes.INTEGER, allowNull: false},
  refreshToken: {type: DataTypes.STRING, require: true}
})

const Cart = sequelize.define('cart', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Wallet = sequelize.define('wallet', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  cash: {type: DataTypes.INTEGER, defaultValue: 0}
})

const CartProduct = sequelize.define('cart_product', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const CurrentPrice = sequelize.define('current_price', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  currentPrice: {type: DataTypes.INTEGER, defaultValue: 0}
})

const Category = sequelize.define('category', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Product = sequelize.define('product', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, allowNull: false},
  description: {type: DataTypes.STRING, allowNull: false},
  isInStock: {type: DataTypes.BOOLEAN, defaultValue: true},
  startDate: {type: DataTypes.STRING, allowNull: false},
  endDate: {type: DataTypes.STRING, allowNull: false},
  priceStep: {type: DataTypes.INTEGER, allowNull: false},
  img: {type: DataTypes.STRING, allowNull: false, defaultValue: ''},
  percentTimeStep: {type: DataTypes.INTEGER, allowNull: false},
  seePrice: {type: DataTypes.INTEGER, allowNull: false},
  startPrice: {type: DataTypes.INTEGER, allowNull: false},
  stepTime: {type: DataTypes.INTEGER, allowNull: false},
  authorEmail: {type: DataTypes.STRING, allowNull: false}
})

const Delivery = sequelize.define('delivery', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  currentPrice: {type: DataTypes.INTEGER, allowNull: false},
  description: {type: DataTypes.STRING, allowNull: false}
})

User.hasOne(Token)
Token.belongsTo(User)

User.hasOne(Cart)
Cart.belongsTo(User)

User.hasOne(Wallet)
Wallet.belongsTo(User)

Cart.hasMany(CartProduct)
CartProduct.belongsTo(Cart)

Product.hasOne(CartProduct)
CartProduct.belongsTo(Product)

Product.hasOne(CurrentPrice)
CurrentPrice.belongsTo(Product)

Category.hasMany(Product)
Product.belongsTo(Category)

Product.hasOne(Delivery)
Delivery.belongsTo(Product)

module.exports = {
  Token,
  User,
  Cart,
  Wallet,
  CartProduct,
  CurrentPrice,
  Category,
  Product,
  Delivery
}