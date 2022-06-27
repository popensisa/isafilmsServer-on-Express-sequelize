require('dotenv').config()
const express = require('express')
const sequelize = require("./db")
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddlaware')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))
app.use(express.static(path.resolve(__dirname, 'staticImg')))
app.use(express.static(path.resolve(__dirname, 'staticVideo')))
app.use(express.static(path.resolve(__dirname, 'staticUsers')))

app.use('/api', router)


// Обработка ошибки
app.use(errorHandler)

const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    }catch(e){
        console.log(e)
    }
}

start()

