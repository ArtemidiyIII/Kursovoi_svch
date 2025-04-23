const {RaftingRating} = require('../models/models')
const ApiError = require('../error/ApiError')
class RatingController {
    async create(req, res, next) {
        try {
            const { rate, userId, raftingId } = req.body; 
            if (!rate || !userId || !raftingId) {
                return next(ApiError.badRequest('All fields (rate, userId, raftingId) are required.'));
            }
            
            const rating = await RaftingRating.create({ rate, userId, raftingId });
            return res.json(rating); 
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async getAll(req,res){
        const ratings = await RaftingRating.findAll()
        return res.json(ratings)
    }
    async getByRaftingId(req, res, next) {
        try {
            const { raftingId } = req.params; 
            if (!raftingId) {
                return next(ApiError.badRequest('Rafting ID is required.'));
            }

            const ratings = await RaftingRating.findAll({ where: { raftingId } });
            return res.json(ratings); 
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }
    
}

module.exports = new RatingController()