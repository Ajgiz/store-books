const ApiError = require("../errorHandler/ApiError");
const TypeService = require("../service/type");

class TypeController {
  async create(req, res, next) {
    try {
      const { name } = req.body;
      const type = await TypeService.create(name);
      return res.status(201).json(type);
    } catch (e) {
      next(e);
    }
  }
  async getAll(req, res, next) {
    try {
      const types = await TypeService.getAll();
      return res.status(200).json(types);
    } catch (e) {
      next(e);
    }
  }
  async getOne() {}
}

module.exports = new TypeController();
