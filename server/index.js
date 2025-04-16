require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')

const router = require('./routes/index')

const PORT = process.env.PORT || 5001

const app = express()
app.use(cors({origin: '*',}))
app.use(express.json())


app.use('/api', router)



const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT,() => console.log(`Server was starting at port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()