import { userService } from "../services/user-service.js";
import { validationResult } from "express-validator";
class AuthController {
  async registration(request, response) {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return new Error({ message: "Произошла ошибка!" });
      }
      const { username, password } = request.body;
      const userData = await userService.registration(username, password);
      response.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return response.json(userData);
    } catch (e) {
      console.log(e);
    }
  }
  async login(request, response) {
    try {
      const { username, password } = request.body;
      const userData = await userService.login(username, password);
      response.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return response.json(userData);
    } catch (e) {
      console.log(e);
    }
  }
  async logout(request, response) {
    try {
      const { refreshToken } = request.body;
      const token = await userService.logout(refreshToken);
      response.clearCookie("refreshToken");
      return response.json(token);
    } catch (error) {
      console.log(error);
    }
  }

  async refresh(request, response) {
    try {
      const { refreshToken } = request.cookies;
      const userData = await userService.refresh(refreshToken);
      response.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return response.json(userData);
    } catch (error) {
      console.log(error);
    }
  }
  async getUsers(request, response) {
    try {
      response.json("21414141");
    } catch (error) {
      console.log(error);
    }
  }
}

const authController = new AuthController();

export default authController;
