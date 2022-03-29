const ApiError = require("../errorHandler/ApiError");
const BrandService = require("../service/brand");

class BrandController {
    async create(req, res, next) {
        try {
          const { name } = req.body;
          const type = await BrandService.create(name);
          return res.status(201).json(type);
        } catch (e) {
          next(e);
        }
      }
      async getAll(req, res, next) {
        try {
          const types = await BrandService.getAll();
          return res.status(200).json(types);
        } catch (e) {
          next(e);
        }
      }
      async getOne() {}
}

module.exports = new BrandController();
