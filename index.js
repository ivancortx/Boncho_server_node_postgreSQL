require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const cookieParser = require('cookie-parser')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static'))) //открыть доступ к файлам в папке static
app.use(fileUpload({}))
app.use('/api', router)

//обработка ошибок - последний middleware
app.use(errorHandler)

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    //сверяет состояние БД со схемой данных
    app.listen(PORT, () => {
      console.log(`server started at ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()
