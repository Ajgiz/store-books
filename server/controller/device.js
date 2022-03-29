const ApiError = require("../errorHandler/ApiError");
const DeviceService = require("../service/device");
const uuid = require("uuid");
const path = require("path");
class DeviceController {
  async create(req, res, next) {
    try {
      const { img } = req.files;
      let fileName = uuid.v4() + "." + img.mimetype.split("/")[1];
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      const { image, ...rest } = req.body;
      const device = await DeviceService.create({ ...rest, img: fileName });
      return res.status(201).json(device);
    } catch (e) {
      next(e);
    }
  }

  async getFilterDevices(req, res, next) {
    const { minPrice, maxPrice, brandId, typeId, page, name } = req.query;
    try {
      const device = await DeviceService.getFilterDevices(
        minPrice,
        maxPrice,
        brandId,
        typeId,
        page,
        name
      );
      res.status(200).json(device);
    } catch (e) {
      next(e);
    }
  }

  async getOne(req, res, next) {
    const { id } = req.params;
    try {
      const device = await DeviceService.getOne(id);
      return res.status(200).json(device);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    const { id } = req.params;
    try {
      const deletedDevice = await DeviceService.delete(id);
      return res.status(200).json(deletedDevice);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    const { id } = req.params;
    try {
      const updatedDevice = await DeviceService.update({ id, ...req.body });
      return res.status(200).json(updatedDevice);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new DeviceController();
