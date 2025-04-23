const {Rafting,Orders,OrdersRafting} = require('../models/models')
const ApiError = require('../error/ApiError')
class RaftingOrdersController {
  async addToRaftingOrders(req, res, next) {
    try {
        const { raftingId, userId } = req.body;

        const raftings = await Rafting.findByPk(raftingId);
        console.log()
        if (!raftings) {
            return res.status(404).json({ message: "сплав не найден", raftings });
        }

        let orders = await Orders.findOne({ where: { userId } });
        if (!orders) {
            orders = await Orders.create({ userId });
        }

        const ordersRafting = await OrdersRafting.findOne({
            where: { ordersId: orders.id, raftingId }
        });
        if (ordersRafting) {
            return res.status(400).json({ message: "Сплав уже забронирован" });
        }

      
        const newOrdersRafting = await OrdersRafting.create({
            ordersId: orders.id,
            raftingId
        });

        return res.json({ message: "Сплав забронирован", ordersRafting: newOrdersRafting });
    } catch (e) {
        next(ApiError.badRequest(e.message));
    }
}
  
async getRaftingOrders(req, res) {
  try {
    const { userId } = req.params;
  
    const orders = await Orders.findOne({ where: { userId } });

    if (!orders) {
      return res.status(404).json({ message: 'Заказы сплавов не найдены' });
    }

    const ordersRaftings = await OrdersRafting.findAll({
      where: { ordersId: orders.id },  
    });

    const raftingIds = ordersRaftings.map(item => item.raftingId);

    

    return res.json(raftingIds);
  } catch (error) {
    console.error('Ошибка получения корзины:', error);
    return res.status(500).json({ message: 'Ошибка получения корзины' });
  }
}

async getRaftingOrdersId(req, res) {
  try {
    const { userId } = req.params;  

    const orders = await Orders.findOne({
      where: { userId },  
    });

    if (!orders) {
      return res.status(404).json({ message: 'Заказы сплавов не найдены' });
    }

    return res.json({ ordersId: orders.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка получения ordersId' });
  }
}


    
     
async removeFromRaftingOrders(req, res) {
  try {
    const { ordersId, raftingId } = req.body; 
    const deleted = await OrdersRafting.destroy({
      where: { ordersId, raftingId } 
    });

    if (deleted) {
      return res.json({ message: 'Заказ сплава успешно удалён из заказов' });
    } else {
      return res.status(404).json({ message: 'Заказ сплава не найден в заказах' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка удаления товара из корзины' });
  }
}


}
module.exports = new RaftingOrdersController()