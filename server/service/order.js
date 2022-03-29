const { BasketDevice, Basket } = require("../models/models");
const DeviceService = require("./device");
const BasketService = require("./basket");

class OrderService {
  async createOrder(basketId, deviceId) {
    const ifExistOrder = await BasketDevice.findOne({
      where: {
        basketId,
        deviceId,
      },
    });

    console.log("ifExistOrder", ifExistOrder);
    if (ifExistOrder) {
      ifExistOrder.count += 1;
      await ifExistOrder.save();
      return ifExistOrder;
    }
    const order = await BasketDevice.create({
      basketId,
      deviceId,
    });
    return order;
  }

  async getAll(userId) {
    const basket = await BasketService.getOne(userId);

    const basketDevices = await BasketDevice.findAll({
      where: {
        basketId: +basket.id,
      },
    });
    if (!basketDevices.length) {
      return [];
    }

    const devices = await DeviceService.getOrder(
      basketDevices.map((i) => i.deviceId)
    );
    const orders = devices.map((elem) => {
      let obj = {};
      basketDevices.forEach((i) => {
        if (i.deviceId === elem.id) {
          obj = { ...elem.dataValues, count: i.count };
        }
      });
      return obj;
    });

    return orders;
  }

  async addOneProduct(basketId, deviceId) {
    const order = await BasketDevice.findOne({
      where: {
        basketId,
        deviceId,
      },
    });
    if (order) {
      order.count += 1;
      await order.save();
    }

    return order;
  }
  async deleteOrder(basketId, deviceId) {
    const deletedOrder = await BasketDevice.destroy({
      where: {
        basketId,
        deviceId,
      },
    });
    return deletedOrder;
  }

  async resetOrders(basketId) {
    const orders = await BasketDevice.destroy({
      where: {
        basketId,
      },
    });
    return orders;
  }

  async removeOneProduct(basketId, deviceId) {
    const order = await BasketDevice.findOne({
      where: {
        basketId,
        deviceId,
      },
    });
    if (order) {
      order.count -= 1;
      await order.save();
    }

    return order;
  }
}
module.exports = new OrderService();
