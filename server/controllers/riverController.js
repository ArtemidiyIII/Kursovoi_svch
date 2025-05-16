const {River,Rafting} = require('../models/models')
const ApiError = require('../error/ApiError')
class RiverController {
    async createRiver(req,res){
        const {name} = req.body
        const river = await River.create({name})
        return res.json(river)
    }
    async getAll(req,res){
        const rivers = await River.findAll()
        return res.json(rivers)
    }
    async updateRiver(req, res){
        try {
          const { id } = req.params; 
          const { name } = req.body; 
      
          const river = await River.findByPk(id);
          if (!river) {
            return res.status(404).json({ message: 'River not found' });
          }
      
          river.name = name; 
          await river.save();
      
          return res.json(river);
        } catch (error) {
          console.error('Error updating river:', error);
          return res.status(500).json({ message: 'Internal server error' });
        }
      }

      async deleteRiver(req, res) {
        const { id } = req.params;
    
        try {
          
          const linkedRafting = await Rafting.findAll({ where: { riverId: id } });
          if (linkedRafting.length > 0) {
            return res.status(400).json({ message: 'Cannot delete river. It is associated with one or more rafting.' });
          }    
          
          const river = await River.destroy({ where: { id } });
          if (!river) {
            return res.status(404).json({ message: 'River not found.' });
          }
    
          return res.status(200).json({ message: 'River deleted successfully.' });
        } catch (error) {
          return res.status(500).json({ message: 'Failed to delete river.', error });
        }
      }
}

module.exports = new RiverController()