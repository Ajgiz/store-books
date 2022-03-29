const ApiError = require("../errorHandler/ApiError");
const UserService = require("../service/user");
const { validationResult } = require("express-validator");
const { handleTokens } = require("../service/user");
class UserController {
  async registration(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(ApiError.badRequest("input data invalid"));
    }

    try {
      const { email, password } = req.body;
      const user = await UserService.registration(email, password);
      res.cookie("refreshToken", user.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await UserService.login(email, password);
      res.cookie("refreshToken", user.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  }

  async check() {}

  async getOne() {}

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      console.log("refreshToken", req.cookies);
      const token = await UserService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      console.log(e.message);
      next(e);
    }
  }

  async activate(req, res, next) {
    try {
      const id = req.params.id;
      await UserService.activate(id);
      return res.redirect(process.env.URL_client);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const user = await UserService.refresh(refreshToken);
      res.cookie("refreshToken", user.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      const userData = await handleTokens(user);
      res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
