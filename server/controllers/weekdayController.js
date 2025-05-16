const {WeekDay,Rafting} = require('../models/models')
class WeekdayController {
    async createWeekday(req,res){
        const {name} = req.body
        const weekday = await WeekDay.create({name})
        return res.json(weekday)
    }
    async getAll(req,res){
        const weekdays = await WeekDay.findAll()
        return res.json(weekdays)
    }
    async updateWeekday(req, res){
        try {
          const { id } = req.params; 
          const { name } = req.body; 
      
          const weekday = await WeekDay.findByPk(id);
          if (!weekday) {
            return res.status(404).json({ message: 'weekday not found' });
          }
      
          weekday.name = name; 
          await weekday.save();
      
          return res.json(weekday);
        } catch (error) {
          console.error('Error updating weekday:', error);
          return res.status(500).json({ message: 'Internal server error' });
        }
      }
      async deleteWeekday(req, res) {
        const { id } = req.params;
    
        try {
          const linkedRafting = await Rafting.findAll({ where: { weekdayId: id } });
          if (linkedRafting.length > 0) {
            return res.status(400).json({ message: 'Cannot delete weekday. It is associated with one or more raftings.' });
          }
    
          const weekday = await WeekDay.destroy({ where: { id } });
          if (!weekday) {
            return res.status(404).json({ message: 'Weekday not found.' });
          }
    
          return res.status(200).json({ message: 'Weekday deleted successfully.' });
        } catch (error) {
          return res.status(500).json({ message: 'Failed to delete weekday.', error });
        }
      }
}

module.exports = new WeekdayController()