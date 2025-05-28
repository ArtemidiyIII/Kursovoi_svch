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
        const renteditems = await RentedItem.create({name, price, brandId, typeId, img: fileName})

        if (info) {
            info = JSON.parse(info);
            
            await Promise.all(info.map(i =>
                RentInfo.create({
                    title: i.title,
                    description: i.description,
                    RentedItemId: renteditems.id
                })
            ));
        }
        return res.json(renteditems)
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
       
    }
    async getAll(req, res) {
        const { brandId, typeId, page = 1, limit = 9, price } = req.query;
        let renteditems;
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
            renteditems = await RentedItem.findAndCountAll({
                where: whereConditions,
                limit,
                offset
            });
    
            return res.json(renteditems);
        } catch (error) {
            console.error("Ошибка при загрузке оборудования на прокат:", error);
            return res.status(500).json({ error: 'Ошибка при загрузке оборудования на прокат' });
        }
    } 
    
    async getOne(req,res){
        const {id} = req.params
        try {
            const renteditems = await RentedItem.findOne(
                {
                    where: {id},
                    include: [{model:RentInfo, as: 'info'}]
                }
            );
            if (!renteditems) {
                return res.status(404).json({ message: "Дополнительное оборудование не найдено" });
            }
            return res.status(200).json(renteditems);
        } catch (error) {
            return res.status(500).json({ message: "Ошибка при получении дополнительное оборудование", error });
        }
    }

    async update(req, res) {
        const { id } = req.params;
        const { img, name, price, riverId, weekdayId} = req.body;
        
        try {
            const renteditems = await RentedItem.findByPk(id);
            if (!renteditems) {
                return res.status(404).json({ message: "Оборудование не найдено" });
            }
            renteditems.img = img;
            renteditems.name = name;
            renteditems.price = price;
            renteditems.typeId = riverId;
            renteditems.brandId = weekdayId;
            await renteditems.save();
            return res.status(200).json(renteditems);
        } catch (error) {
            return res.status(500).json({ message: "Ошибка при обновлении дополнительного оборудования", error });
        }
    }

    async delete(req, res) {
        const { id } = req.params;
    
        try {
            /*const rentInfo = await RentInfo.findOne({ where: { RentedItemId: id } });
            if (!rentInfo) {
                return res.status(404).json({ message: "Информация о дополнительном оборудовании не найдено" });
            }
            await RentInfo.destroy({
                where: { RentedItemId: id }
            });*/

            const renteditems = await RentedItem.findByPk(id);
            if (!renteditems) {
                return res.status(404).json({ message: "Дополнительное оборудование не найдено" });
            }
            await RentedItem.destroy({
                where: { id }
            });

            

            return res.status(204).json({ message: "Оборудование на прокат успешно удалено" }); 
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Ошибка при удалении оборудования на прокат" });
        }
      }
}

module.exports = new RentedItemController()