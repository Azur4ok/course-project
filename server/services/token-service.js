import jwt from "jsonwebtoken";
import tokenModel from "../models/tokenModel.js";

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "10m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token) {
    try {
        const tokenData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        return tokenData;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
        const tokenData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        return tokenData;
    } catch (error) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await tokenModel.create({ user: userId, refreshToken });
    return token;
  }
  async removeToken(refreshToken) {
    const token = await tokenModel.deleteOne({ refreshToken });
    return token;
  }

  async findToken(token) {
    const tokenData = tokenModel.findOne({ token });
    return tokenData;
  }
}

const tokenService = new TokenService();

export default tokenService;
