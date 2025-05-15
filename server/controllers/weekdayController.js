const {WeekDay,Rafting} = require('../models/models')
class WeekdayController {
    async create(req,res){
        const {name} = req.body
        const brand = await WeekDay.create({name})
        return res.json(brand)
    }
    async getAll(req,res){
        const brands = await WeekDay.findAll()
        return res.json(brands)
    }
    async updateWeekday(req, res){
        try {
          const { id } = req.params; 
          const { name } = req.body; 
      
          const brand = await WeekDay.findByPk(id);
          if (!brand) {
            return res.status(404).json({ message: 'brand not found' });
          }
      
          brand.name = name; 
          await brand.save();
      
          return res.json(brand);
        } catch (error) {
          console.error('Error updating brand:', error);
          return res.status(500).json({ message: 'Internal server error' });
        }
      }
      async delete(req, res) {
        const { id } = req.params;
    
        try {
          const linkedRentedItem = await Rafting.findAll({ where: { brandId: id } });
          if (linkedRentedItem.length > 0) {
            return res.status(400).json({ message: 'Cannot delete brand. It is associated with one or more rented item.' });
          }
    
          const brand = await WeekDay.destroy({ where: { id } });
          if (!brand) {
            return res.status(404).json({ message: 'Brand not found.' });
          }
    
          return res.status(200).json({ message: 'Brand deleted successfully.' });
        } catch (error) {
          return res.status(500).json({ message: 'Failed to delete brand.', error });
        }
      }
}

module.exports = new WeekdayController()