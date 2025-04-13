const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
    email: {type: DataTypes.STRING, unique:true, allowNull: false, },
    password: {type: DataTypes.STRING, allowNull: false,},
    role: {type: DataTypes.STRING,  defaultValue: "USER",},
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},    
})

const BasketRent = sequelize.define('basket_rent', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},    
})

const BasketRafting = sequelize.define('basket_rafting', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},    
})

const RentedItem = sequelize.define('rented_item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
    name: {type: DataTypes.STRING, unique:true, allowNull: false, },
    price: {type: DataTypes.INTEGER, allowNull: false, },
    img: {type: DataTypes.STRING, allowNull: false, },
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,}, 
    name: {type: DataTypes.STRING, unique:true, allowNull: false, },   
})

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},  
    name: {type: DataTypes.STRING, unique:true, allowNull: false, },  
})

const RentInfo = sequelize.define('rent_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},  
    title: {type: DataTypes.STRING, allowNull: false, },  
    description: {type: DataTypes.STRING, allowNull: false, },  
})

const Rafting = sequelize.define('rafting', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
    name: {type: DataTypes.STRING, unique:true, allowNull: false, },
    price: {type: DataTypes.INTEGER, allowNull: false, },
    rating: {type: DataTypes.INTEGER, defaultValue:0, },
    img: {type: DataTypes.STRING, allowNull: false, },
})

const RaftingRating = sequelize.define('rafting_rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},  
    rate: {type: DataTypes.INTEGER, allowNull: false, },  
})

