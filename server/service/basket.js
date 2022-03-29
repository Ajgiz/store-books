const { Basket } = require("../models/models");

class BasketService {
  async create(id) {
    const basket = await Basket.create({
      userId: id,
    });
    return basket;
  }

  async getOne(id) {
    const basket = await Basket.findOne({
      where: {
        userId: id,
      },
    });
    return basket;
  }
}

module.exports = new BasketService();
