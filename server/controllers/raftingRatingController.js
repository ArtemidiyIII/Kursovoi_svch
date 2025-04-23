const {Rating} = require('../models/models')
const ApiError = require('../error/ApiError')
class RaitingController {
    async create(req, res, next) {
        try {
            const { rate, userId, goodId } = req.body; 
            if (!rate || !userId || !goodId) {
                return next(ApiError.badRequest('All fields (rate, userId, goodId) are required.'));
            }
            
            const raiting = await Rating.create({ rate, userId, goodId });
            return res.json(raiting); 
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async getAll(req,res){
        const raitings = await Rating.findAll()
        return res.json(raitings)
    }
    async getByGoodId(req, res, next) {
        try {
            const { goodId } = req.params; 
            if (!goodId) {
                return next(ApiError.badRequest('Good ID is required.'));
            }

            const raitings = await Rating.findAll({ where: { goodId } });
            return res.json(raitings); 
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }
    
}

module.exports = new RaitingController()