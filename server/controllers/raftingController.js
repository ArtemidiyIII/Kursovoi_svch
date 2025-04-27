const uuid = require('uuid')
const path = require('path')
const { Rafting } = require('../models/models')
const ApiError = require('../error/ApiError')
const { where } = require('sequelize')
const { title } = require('process')
const { Op } = require('sequelize');

class RaftingController {
    async create(req,res,next){
        try{
            let { name, price, discount_price, riverId } = req.body;
           
            
            let img = req.files ? req.files.img : null;
            let fileName;
          
            if (!img) {
                fileName = 'default.jpg';
            } else {
                
                fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));
         
            }
        const raftings = await Rafting.create({name, price, discount_price, riverId, img: fileName})

        return res.json(raftings)
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
       
    }
    async getAll(req, res) {
        try {
            const raftings = await Rafting.findAll();
            return res.status(200).json(raftings);
        } catch (error) {
            return res.status(500).json({ message: "Ошибка при сплавов", error });
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
        const { img, name, price, discount_price, riverId } = req.body;
        
        try {
            const rafting = await Rafting.findByPk(id);
            if (!rafting ) {
                return res.status(404).json({ message: "сплав не найден" });
            }
            rafting.img = img;
            rafting.name = name;
            rafting.price = price;
            rafting.discount_price = discount_price;
            rafting.riverId = riverId;
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

module.exports = new RaftingController()