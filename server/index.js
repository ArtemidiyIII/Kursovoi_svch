require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models.js')

const PORT = process.env.PORT || 5001

const app = express()

const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT,() => console.log(`Server was starting at port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}