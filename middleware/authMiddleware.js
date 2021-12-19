const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  console.log('sss2')

  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(401).json({message: 'Пользователь не авторизирован'})
    }
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)

    //------------Следующие middleware будут иметь доступ к этому req.user = decoded -----------//
    req.user = decoded
    next()

  }catch (e) {
    res.status(401).json({message: 'Пользователь не авторизирован'})
  }
}