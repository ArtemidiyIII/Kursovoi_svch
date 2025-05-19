const {Rafting,Orders,OrdersRafting} = require('../models/models')
const ApiError = require('../error/ApiError')
class RaftingOrdersController {
  async addToOrdersRafting(req, res, next) {
    try {
        const { raftingId, userId } = req.body;

        const raftings = await Rafting.findByPk(raftingId);
        console.log()
        if (!raftings) {
            return res.status(404).json({ message: "сплав не найден", raftings });
        }

        let order = await Orders.findOne({ where: { userId } });
        if (!order) {
            order = await Orders.create({ userId });
        }

        const ordersRafting = await OrdersRafting.findOne({
            where: { orderId: order.id, raftingId }
        });
        if (ordersRafting) {
            return res.status(400).json({ message: "Сплав уже забронирован" });
        }

      
        const newOrdersRafting = await OrdersRafting.create({
            orderId: order.id,
            raftingId
        });

        return res.json({ message: "Сплав забронирован", ordersRafting: newOrdersRafting });
    } catch (e) {
        next(ApiError.badRequest(e.message));
    }
}
  
async getOrdersRafting(req, res) {
  try {
    const { userId } = req.params;
  
    const order = await Orders.findOne({ where: { userId } });

    if (!order) {
      return res.status(404).json({ message: 'Список заказов не найден' });
    }

    const ordersRaftings = await OrdersRafting.findAll({
      where: { orderId: order.id },  
    });

    const raftingIds = ordersRaftings.map(item => item.raftingId);

    

    return res.json(raftingIds);
  } catch (error) {
    console.error('Ошибка получения корзины:', error);
    return res.status(500).json({ message: 'Ошибка получения корзины' });
  }
}

async getOrdersRaftingId(req, res) {
  try {
    const { userId } = req.params;  

    const order = await Orders.findOne({
      where: { userId },  
    });

    if (!order) {
      return res.status(404).json({ message: 'Заказы сплавов не найдены' });
    }

    return res.json({ orderId: order.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка получения ordersId' });
  }
}


    
     
async removeFromOrdersRafting(req, res) {
  try {
    const { orderId, raftingId } = req.body; 
    const deleted = await OrdersRafting.destroy({
      where: { orderId, raftingId } 
    });

    if (deleted) {
      return res.json({ message: 'Заказ сплава успешно удалён из заказов' });
    } else {
      return res.status(404).json({ message: 'Заказ сплава не найден в заказах' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка удаления заказа сплава из списка заказов' });
  }
}


}
module.exports = new RaftingOrdersController()