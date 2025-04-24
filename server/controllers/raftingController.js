const uuid = require('uuid')
const path = require('path')
const { Rafting } = require('../models/models')
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
        const rentedItems = await Rafting.create({name, price, brandId, typeId, img: fileName})

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
            rentedItems = await Rafting.findAndCountAll({
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
            const raftings = await Rafting.findByPk(id);
            if (!raftings) {
                return res.status(404).json({ message: "Сплав на байдарках не найден" });
            }
            return res.status(200).json(raftings);
        } catch (error) {
            return res.status(500).json({ message: "Ошибка при получении сплава", error });
        }
    }

    async update(req, res) {
        const { id } = req.params;
        const { img, name, price, discount_price } = req.body;
        
        try {
            const rafting = await Rafting.findByPk(id);
            if (!rafting ) {
                return res.status(404).json({ message: "сплав не найден" });
            }
            rafting.img = img;
            rafting.name = name;
            rafting.price = price;
            rafting.discount_price = discount_price;
            await rafting .save();
            return res.status(200).json(rafting );
        } catch (error) {
            return res.status(500).json({ message: "Ошибка при обновлении дополнительного оборудования", error });
        }
    }

    async delete(req, res) {
        const { id } = req.params;
    
        try {
            const rafting = await Rafting.findByPk(id);
            if (!rafting) {
                return res.status(404).json({ message: "Сплав не найден" });
            }
            await Rafting.destroy({
                where: { id: id }
            });

            return res.status(204).json({ message: "Сплав успешно удален" }); 
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Ошибка при удалении сплава" });
        }
      }
}

module.exports = new RentedItemController()