const { Device, DeviceInfo } = require("../models/models");
const { Op } = require("@sequelize/core");
class DeviceService {
  async create(data) {
    const newDevice = await Device.create({ ...data });
    
    if (data.info) {
      data.info = JSON.parse(data.info);
      data.info.forEach((i) => {
        DeviceInfo.create({
          title: i.name,
          description: i.description,
          deviceId: newDevice.id,
        });
      });
    }
    return newDevice;
  }

  async getOrder(arrId) {
    const orders = await Device.findAll({
      where: {
        id: {
          [Op.or]: [...arrId],
        },
      },
    });
    return orders;
  }

  async getFilterDevices(
    minPrice = 0,
    maxPrice = 100000,
    brandId = 0,
    typeId = 0,
    page,
    name = ""
  ) {
    let device;
    if (!brandId && !typeId) {
      device = Device.findAndCountAll({
        where: {
          [Op.and]: [
            { price: { [Op.between]: [minPrice, maxPrice] } },
            { name: { [Op.regexp]: name } },
          ],
        },
        limit: 10,
        offset: page * 10 - 10,
      });
    }
    if (brandId && !typeId) {
      device = await Device.findAndCountAll({
        where: {
          [Op.and]: [
            { brandId },
            {
              [Op.and]: [
                { price: { [Op.between]: [minPrice, maxPrice] } },
                { name: { [Op.regexp]: name } },
              ],
            },
          ],
        },
        limit: 10,
        offset: page * 10 - 10,
      });
    }
    if (!brandId && typeId) {
      device = await Device.findAndCountAll({
        where: {
          [Op.and]: [
            { typeId },
            {
              [Op.and]: [
                { price: { [Op.between]: [minPrice, maxPrice] } },
                { name: { [Op.regexp]: name } },
              ],
            },
          ],
        },
        limit: 10,
        offset: page * 10 - 10,
      });
    }
    if (brandId && typeId) {
      device = await Device.findAndCountAll({
        where: {
          [Op.and]: [
            { typeId, brandId },
            {
              [Op.and]: [
                { price: { [Op.between]: [minPrice, maxPrice] } },
                { name: { [Op.regexp]: name } },
              ],
            },
          ],
        },
        limit: 10,
        offset: page * 10 - 10,
      });
    }
    return device;
  }

  async delete(id) {
    const device = await Device.destroy({
      where: {
        id,
      },
    });
    return device;
  }

  async update(data) {
    const { price, rating, name, id } = data;
    const device = await Device.update(
      { rating, price, name },
      { where: { id } }
    );
    return device;
  }

  async getOne(id) {
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: "info" }],
    });
    return device;
  }
}
module.exports = new DeviceService();
