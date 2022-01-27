import { User } from "./../models/UserModel.js";
import { Role } from "./../models/roleModel.js";
import { UserDto } from "../dtos/user-dto.js";
import bcrypt from "bcrypt";
import tokenService from "./token-service.js";

class UserService {
  async registration(username, password) {
    console.log('i got here');
    const candidate = await User.findOne({ username });
    if (candidate) {
      throw new Error("Пользователь с таким username уже существует!");
    }
    const hashedPassword = bcrypt.hashSync(password, 3);
    const userRole = await Role.findOne({ value: "user" });
    const user = await User.create({
      username,
      password: hashedPassword,
      roles: [userRole.value],
    });

    const userDataTransfer = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDataTransfer });
    await tokenService.saveToken(userDataTransfer.id, tokens.refreshToken);
    return { ...tokens, user: userDataTransfer };
  }
  async login(username, password) {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("Пользователь не зарегистрирован.");
    }

    const isPasswordEquals = await bcrypt.compare(password, user.password);
    if (!isPasswordEquals) {
      throw new Error("Неверный пароль.");
    }
    const userDataTransfer = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDataTransfer });
    await tokenService.saveToken(userDataTransfer.id, tokens.refreshToken);
    return { ...tokens, user: userDataTransfer };
  }
  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new Error("Пользователь не зарегистрирован");
    }
    const tokenData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await tokenService.findToken(refreshToken);
    if (!tokenData || !tokenFromDB) {
      throw new Error("Пользователь не зарегистрирован");
    } 
    const user =await User.findById(tokenData.id);
    const userDataTransfer = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDataTransfer });
    await tokenService.saveToken(userDataTransfer.id, tokens.refreshToken);
    return { ...tokens, user: userDataTransfer };
  }
}

export const userService = new UserService();
