const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
    email: {type: DataTypes.STRING, unique:true, allowNull: false, },
    nickname: {type: DataTypes.STRING, allowNull: false,},
    password: {type: DataTypes.STRING, allowNull: false,},
    role: {type: DataTypes.STRING,  defaultValue: "USER",},
    block: {type: DataTypes.BOOLEAN, defaultValue: false}
})

const Orders = sequelize.define('orders', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},    
})

const OrdersRent = sequelize.define('orders_rent', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},    
})

const OrdersRafting = sequelize.define('orders_rafting', {
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
    discount_price: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: price},
    rating: {type: DataTypes.INTEGER, defaultValue:0, },
    img: {type: DataTypes.STRING, allowNull: false, },
})

const River = sequelize.define('river', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,}, 
    name: {type: DataTypes.STRING, unique:true, allowNull: false, },   
})

const RaftingRating = sequelize.define('rafting_rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},  
    rate: {type: DataTypes.INTEGER, allowNull: false, },  
})


User.hasOne(Orders)
Orders.belongsTo(User)

Orders.hasMany(OrdersRent)
OrdersRent.belongsTo(Orders)

Orders.hasMany(OrdersRafting)
OrdersRafting.belongsTo(Orders)

Type.hasMany(RentedItem)
RentedItem.belongsTo(Type)

Brand.hasMany(RentedItem)
RentedItem.belongsTo(Brand)

RentedItem.hasMany(OrdersRent)
OrdersRent.belongsTo(RentedItem)

RentedItem.hasMany(RentInfo)
RentInfo.belongsTo(RentedItem)

Rafting.hasMany(OrdersRafting)
OrdersRafting.belongsTo(Rafting)

River.hasMany(Rafting)
Rafting.belongsTo(River)

User.hasMany(RaftingRating)
RaftingRating.belongsTo(User)

Rafting.hasMany(RaftingRating)
RaftingRating.belongsTo(Rafting)


module.exports = {
    User,
    Orders,
    OrdersRent,
    OrdersRafting,
    RentedItem,
    Type,
    Brand,
    RentInfo,
    River,
    Rafting,
    RaftingRating
}