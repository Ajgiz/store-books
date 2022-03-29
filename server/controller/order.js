const OrderService = require("../service/order");
const BasketService = require("../service/basket");

class OrdersController {
  async createOrder(req, res, next) {
    try {
      const { productId } = req.body;
      const { id } = req.user;

      const basket = await BasketService.getOne(id);
      const order = await OrderService.createOrder(basket.id, productId);
      return res.status(201).json(order);
    } catch (e) {
      next(e);
    }
  }
  async getAll(req, res, next) {
    try {
      const { id } = req.user;

      const devices = await OrderService.getAll(id);
      return res.status(200).json(devices);
    } catch (e) {
      next(e);
    }
  }

  async addOneProduct(req, res, next) {
    try {
      const { productId } = req.body;
      const { id } = req.user;

      const basket = await BasketService.getOne(id);
      const order = await OrderService.addOneProduct(basket.id, productId);
      return res.status(200).json(order);
    } catch (e) {
      next(e);
    }
  }

  async deleteOrder(req, res, next) {
    try {
      const { productId } = req.query;
      const { id } = req.user;

      const basket = await BasketService.getOne(id);
      const order = await OrderService.deleteOrder(basket.id, productId);
      return res.status(200).json(order);
    } catch (e) {
      next(e);
    }
  }

  async resetOrders(req, res, next) {
    try {
      const { id } = req.user;
      
      const basket = await BasketService.getOne(id);
      const order = await OrderService.resetOrders(basket.id);
      return res.status(200).json(order);
    } catch (e) {
      next(e);
    }
  }

  async removeOneProduct(req, res, next) {
    try {
      const { productId } = req.body;
      const { id } = req.user;

      const basket = await BasketService.getOne(id);
      const order = await OrderService.removeOneProduct(basket.id, productId);
      return res.status(200).json(order);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new OrdersController();
