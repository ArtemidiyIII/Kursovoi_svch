const uuid = require('uuid')
const path = require('path')
const { Goods, GoodsInfo } = require('../models/models')
const ApiError = require('../error/ApiError')
const { where } = require('sequelize')
const { title } = require('process')
const { Op } = require('sequelize');

class GoodsController {
    async create(req,res,next){
        try{
            let { name, price, brandId, typeId, info } = req.body;
           
            
            let img = req.files ? req.files.img : null;
     let fileName;
          
            if (!img) {
                fileName = 'default.jpg';
            } else {
                
                fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));
         
            }
        const goods = await Goods.create({name, price, brandId, typeId, img: fileName})

        if (info) {
            info = JSON.parse(info);
            
            await Promise.all(info.map(i =>
                GoodsInfo.create({
                    title: i.title,
                    description: i.description,
                    goodId: goods.id
                })
            ));
        }
        return res.json(goods)
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
       
    }
    async getAll(req, res) {
        const { brandId, typeId, page = 1, limit = 9, price } = req.query;
        let goods;
        let offset = (page - 1) * limit;
    
        const whereConditions = {};
    
        if (brandId) {
            whereConditions.brandId = brandId;
        }
    
        if (typeId) {
            whereConditions.typeId = typeId;
        }
    
        if (price) {
            whereConditions.price = { [Op.gte]: price }; 
         }
    
        try {
            goods = await Goods.findAndCountAll({
                where: whereConditions,
                limit,
                offset
            });
    
            return res.json(goods);
        } catch (error) {
            console.error("Ошибка при загрузке товаров:", error);
            return res.status(500).json({ error: 'Ошибка при загрузке товаров' });
        }
    } 
    
    async getOne(req,res){
        const {id} = req.params
        const goods = await Goods.findOne(
            {
                where: {id},
                include: [{model:GoodsInfo, as: 'info' }]
            }
        )
        return res.json(goods)
    }

    async delete(req, res) {
        const { id } = req.params;
    
        try {
          const good = await Goods.destroy({ where: { id } });
          if (!good) {
            return res.status(404).json({ message: 'Good not found.' });
          }    
          return res.status(200).json({ message: 'Good deleted successfully.' });
        } catch (error) {
          return res.status(500).json({ message: 'Failed to delete good.', error });
        }
      }
}

module.exports = new GoodsController()