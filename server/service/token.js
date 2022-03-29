const jwt = require("jsonwebtoken");
const { Token } = require("../models/models");
class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_access_key, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_refresh_key, {
      expiresIn: "15d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  async createToken(userId, refreshToken) {
    const token = await Token.findOne({ where: { userId } });

    if (token) {
      token.refreshToken = refreshToken;
      return await token.save();
    }
    const newToken = await Token.create({
      userId: userId,
      refreshToken: refreshToken,
    });
    return newToken;
  }

  accessValidate(token) {
    try {
      const data = jwt.verify(token, process.env.JWT_access_key);
      return data;
    } catch (e) {
      return null;
    }
  }

  refreshValidate(token) {
    try {
      const data = jwt.verify(token, process.env.JWT_refresh_key);
      return data;
    } catch (e) {
      return null;
    }
  }
  async removeToken(refreshToken) {
    const token = await Token.findOne({ where: { refreshToken } });
    await token.destroy();
    return token;
  }

  async findToken(refreshToken) {
    const token = await Token.findOne({ where: { refreshToken } });
    return token;
  }
}

module.exports = new TokenService();
