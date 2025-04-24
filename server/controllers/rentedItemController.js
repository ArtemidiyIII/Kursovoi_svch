const uuid = require('uuid')
const path = require('path')
const { RentedItem, RentInfo } = require('../models/models')
const ApiError = require('../error/ApiError')
const { where } = require('sequelize')
const { title } = require('process')
const { Op } = require('sequelize');

class RentedItemController {
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
        const rentedItems = await RentedItem.create({name, price, brandId, typeId, img: fileName})

        if (info) {
            info = JSON.parse(info);
            
            await Promise.all(info.map(i =>
                RentInfo.create({
                    title: i.title,
                    description: i.description,
                    RentedItemId: rentedItems.id
                })
            ));
        }
        return res.json(rentedItems)
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
       
    }
    async getAll(req, res) {
        const { brandId, typeId, page = 1, limit = 9, price } = req.query;
        let rentedItems;
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
            rentedItems = await RentedItem.findAndCountAll({
                where: whereConditions,
                limit,
                offset
            });
    
            return res.json(goods);
        } catch (error) {
            console.error("Ошибка при загрузке оборудования на прокат:", error);
            return res.status(500).json({ error: 'Ошибка при загрузке оборудования на прокат' });
        }
    } 
    
    async getOne(req,res){
        const {id} = req.params
        try {
            const rentedItems = await RentedItem.findByPk(id);
            if (!rentedItems) {
                return res.status(404).json({ message: "Дополнительное оборудование не найдено" });
            }
            return res.status(200).json(rentedItems);
        } catch (error) {
            return res.status(500).json({ message: "Ошибка при получении дополнительное оборудование", error });
        }
    }

    async update(req, res) {
        const { id } = req.params;
        const { img, name, price } = req.body;
        
        try {
            const rentedItem = await RentedItem.findByPk(id);
            if (!rentedItem) {
                return res.status(404).json({ message: "Компания не найдена" });
            }
            rentedItem.img = img;
            rentedItem.name = name;
            rentedItem.price = price;
            await rentedItem.save();
            return res.status(200).json(rentedItem);
        } catch (error) {
            return res.status(500).json({ message: "Ошибка при обновлении дополнительного оборудования", error });
        }
    }

    async delete(req, res) {
        const { id } = req.params;
    
        try {
            const rentInfo = await RentInfo.findOne({ where: { RentedItemId: id } });
            if (!rentInfo) {
                return res.status(404).json({ message: "Информация о дополнительном оборудовании не найдено" });
            }
            await RentInfo.destroy({
                where: { RentedItemId: id }
            });

            const rentedItem = await RentedItem.findByPk(id);
            if (!rentedItem) {
                return res.status(404).json({ message: "Дополнительное оборудование не найдено" });
            }
            await RentedItem.destroy({
                where: { id: id }
            });

            

            return res.status(204).json({ message: "Оборудование на прокат успешно удалено" }); 
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Ошибка при удалении оборудования на прокат" });
        }
      }
}

module.exports = new RentedItemController()