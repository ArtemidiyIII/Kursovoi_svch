const {Type,RentedItem} = require('../models/models')
const ApiError = require('../error/ApiError')
class TypeController {
    async create(req,res){
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)
    }
    async getAll(req,res){
        const types = await Type.findAll()
        return res.json(types)
    }
    async updateType(req, res){
        try {
          const { id } = req.params; 
          const { name } = req.body; 
      
          const type = await Type.findByPk(id);
          if (!type) {
            return res.status(404).json({ message: 'Type not found' });
          }
      
          type.name = name; 
          await type.save();
      
          return res.json(type);
        } catch (error) {
          console.error('Error updating type:', error);
          return res.status(500).json({ message: 'Internal server error' });
        }
      }

      async delete(req, res) {
        const { id } = req.params;
    
        try {
          
          const linkedRentedItem = await RentedItem.findAll({ where: { typeId: id } });
          if (linkedRentedItem.length > 0) {
            return res.status(400).json({ message: 'Cannot delete type. It is associated with one or more rented item.' });
          }    
          
          const type = await Type.destroy({ where: { id } });
          if (!type) {
            return res.status(404).json({ message: 'Type not found.' });
          }
    
          return res.status(200).json({ message: 'Type deleted successfully.' });
        } catch (error) {
          return res.status(500).json({ message: 'Failed to delete type.', error });
        }
      }
}

module.exports = new TypeController()