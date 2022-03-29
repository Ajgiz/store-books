const { Sequelize } = require("sequelize");

module.exports = new Sequelize(
  process.env.DB_name,
  process.env.DB_user,
  process.env.DB_password,
  {
    dialect: "postgres",
    host: process.env.DB_host,
    port: process.env.DB_port,
  }
);
