const { Type } = require("../models/models");

class TypeService {
  async create(name) {
    const newType = await Type.create({ name });
    return newType;
  }
  async getAll() {
    const types = await Type.findAll();
    return types;
  }
}
module.exports = new TypeService();
