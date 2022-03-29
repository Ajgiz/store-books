const { User, Basket, BasketDevice } = require("../models/models");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const MailService = require("./mail");
const TokenService = require("./token");
const ApiError = require("../errorHandler/ApiError");
const BasketService = require("./basket");

class UserService {
  async getAll() {}
  async getOne() {}

  async logout(refreshToken) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw ApiError.badRequest("User not found");
    }
    const isRightPassword = await bcrypt.compare(password, user.password);
    if (!isRightPassword) {
      throw ApiError.badRequest("Password in wrong");
    }
    return this.handleTokens(user);
  }

  async handleTokens(user) {
    const { email, id, isActivated, role } = user;
    const tokens = TokenService.generateToken({ email, id, isActivated, role });
    await TokenService.createToken(id, tokens.refreshToken);

    return { ...tokens, id, email, isActivated, role: "USER" };
  }

  async registration(email, password) {
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      throw ApiError.badRequest(
        `User with this ${candidate.email} email  already exists`
      );
    }
    const activationLink = uuid.v4();
    const hashPassword = await bcrypt.hash(password, 3);
    const user = await User.create({
      email,
      password: hashPassword,
      activationLink,
    });

    await MailService.sendActivationMail(
      email,
      `${process.env.URL_server}/api/user/activate/${activationLink}`
    );

    await BasketService.create(user.id);
    return this.handleTokens(user);
  }

  async activate(activationLink) {
    const user = await User.findOne({ where: { activationLink } });
    if (!user) {
      throw ApiError.badRequest("invalid link");
    }
    user.isActivated = true;
    await user.save();
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.unauthorized("not authorized");
    }
    const token = await TokenService.findToken(refreshToken);

    const user = TokenService.refreshValidate(refreshToken);

    if (!token || !user) {
      throw ApiError.unauthorized("not authorized");
    }

    const reloadUser = await User.findOne({ where: { email: user.email } });
    return this.handleTokens(user);
  }
}
module.exports = new UserService();
