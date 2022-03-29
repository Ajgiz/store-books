const { Brand } = require("../models/models");

class BrandService {
  async create(name) {
    const newBrand = await Brand.create({ name });
    return newBrand;
  }
  async getAll() {
    const brands = await Brand.findAll();
    return brands;
  }
}
module.exports = new BrandService();
