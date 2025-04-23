const {RentedItem,Orders,OrdersRent} = require('../models/models')
const ApiError = require('../error/ApiError')
class OrdersRentController {
  async addToRentOrders(req, res, next) {
    try {
        const { rented_itemId, userId } = req.body;

        const rented_items = await RentedItem.findByPk(rented_itemId);
        console.log()
        if (!rented_items) {
            return res.status(404).json({ message: "сплав не найден", rented_items });
        }

        let orders = await Orders.findOne({ where: { userId } });
        if (!orders) {
            orders = await Orders.create({ userId });
        }

        const ordersRent = await OrdersRent.findOne({
            where: { ordersId: orders.id, rented_itemId }
        });
        if (ordersRent) {
            return res.status(400).json({ message: "Оборудование уже добавлено в прокат" });
        }

      
        const newOrdersRent = await OrdersRent.create({
            ordersId: orders.id,
            rented_itemId
        });

        return res.json({ message: "Оборудование добавлено в прокат", ordersRent: newOrdersRent });
    } catch (e) {
        next(ApiError.badRequest(e.message));
    }
}
  
async getRentOrders(req, res) {
  try {
    const { userId } = req.params;
  
    const orders = await Orders.findOne({ where: { userId } });

    if (!orders) {
      return res.status(404).json({ message: 'Список заказов не найден' });
    }

    const ordersRents = await OrdersRent.findAll({
      where: { ordersId: orders.id },  
    });

    const rented_itemIds = ordersRents.map(item => item.rented_itemId);

    

    return res.json(rented_itemIds);
  } catch (error) {
    console.error('Ошибка получения cписка заказов:', error);
    return res.status(500).json({ message: 'Ошибка получения cписка заказов' });
  }
}

async getRentOrdersId(req, res) {
  try {
    const { userId } = req.params;  

    const orders = await Orders.findOne({
      where: { userId },  
    });

    if (!orders) {
      return res.status(404).json({ message: 'Cписок заказов не найден' });
    }

    return res.json({ ordersId: orders.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка получения ordersId' });
  }
}


    
     
async removeFromRentOrders(req, res) {
  try {
    const { ordersId, rented_itemId } = req.body; 
    const deleted = await OrdersRent.destroy({
      where: { ordersId, rented_itemId } 
    });

    if (deleted) {
      return res.json({ message: 'Заказ проката оборудования успешно удалён из заказов' });
    } else {
      return res.status(404).json({ message: 'Заказ проката не найден в заказах' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка удаления заказа проката из списка заказов' });
  }
}


}
module.exports = new OrdersRentController()