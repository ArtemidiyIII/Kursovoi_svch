const {RentedItem,Orders,OrdersRent} = require('../models/models')
const ApiError = require('../error/ApiError')
class OrdersRentController {
  async addToOrdersRent(req, res, next) {
    try {
        const { rentedItemId, userId } = req.body;

        const rented_items = await RentedItem.findByPk(rentedItemId);
        console.log()
        if (!rented_items) {
            return res.status(404).json({ message: "сплав не найден", rented_items });
        }

        let order = await Orders.findOne({ where: { userId } });
        if (!order) {
            order = await Orders.create({ userId });
        }

        const ordersRent = await OrdersRent.findOne({
            where: { orderId: order.id, rentedItemId }
        });
        if (ordersRent) {
            return res.status(400).json({ message: "Оборудование уже добавлено в прокат" });
        }

      
        const newOrdersRent = await OrdersRent.create({
            orderId: order.id,
            rentedItemId
        });

        return res.json({ message: "Оборудование добавлено в прокат", ordersRent: newOrdersRent });
    } catch (e) {
        next(ApiError.badRequest(e.message));
    }
}
  
async getOrdersRent(req, res) {
  try {
    const { userId } = req.params;
  
    const order = await Orders.findOne({ where: { userId } });

    if (!order) {
      return res.status(404).json({ message: 'Список заказов не найден' });
    }

    const ordersRents = await OrdersRent.findAll({
      where: { orderId: order.id },  
    });

    const rentedItemIds = ordersRents.map(item => item.rentedItemId);

    

    return res.json(rentedItemIds);
  } catch (error) {
    console.error('Ошибка получения cписка заказов:', error);
    return res.status(500).json({ message: 'Ошибка получения cписка заказов' });
  }
}

async getOrdersRentId(req, res) {
  try {
    const { userId } = req.params;  

    const order = await Orders.findOne({
      where: { userId },  
    });

    if (!order) {
      return res.status(404).json({ message: 'Cписок заказов не найден' });
    }

    return res.json({ orderId: order.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка получения ordersId' });
  }
}


    
     
async removeFromOrdersRent(req, res) {
  try {
    const { orderId, rentedItemId } = req.body; 
    const deleted = await OrdersRent.destroy({
      where: { orderId, rentedItemId } 
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