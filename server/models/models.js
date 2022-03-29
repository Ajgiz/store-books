const sequslize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequslize.define("user", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
  activationLink: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Basket = sequslize.define("basket", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
});

const BasketDevice = sequslize.define("basket_device", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  count: { type: DataTypes.INTEGER, defaultValue: 1 },
});

const Device = sequslize.define("device", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
  img: { type: DataTypes.STRING, allowNull: false },
});

const Type = sequslize.define("type", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Brand = sequslize.define("brand", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Rating = sequslize.define("rating", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  rate: { type: DataTypes.INTEGER, allowNull: false },
});

const DeviceInfo = sequslize.define("device_info", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
});

const TypeBrand = sequslize.define("type_brand", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
});

const Token = sequslize.define(
  "token",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    refreshToken: { type: DataTypes.STRING, allowNull: false },
  },
  { freezeTableName: true }
);

User.hasOne(Token); //user=исходный token=целевой foreign key define в целевой модели
Token.belongsTo(User);

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

Type.hasMany(Device);
Device.belongsTo(Type);

Brand.hasMany(Device);
Device.belongsTo(Brand);

Device.hasMany(Rating);
Rating.belongsTo(Device);

Device.hasMany(BasketDevice);
BasketDevice.belongsTo(Device);

Device.hasMany(DeviceInfo, { as: "info" });
DeviceInfo.belongsTo(Device);

Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });

module.exports = {
  User,
  Basket,
  Device,
  DeviceInfo,
  Brand,
  Type,
  Rating,
  BasketDevice,
  TypeBrand,
  Token,
};
