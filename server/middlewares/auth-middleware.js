import tokenService from "../services/token-service";

export const authMiddleware = (request, response) => {
  try {
    const authroizationHeader = request.headers.authorization;
    if (!authroizationHeader) {
      throw new Error("Пользователь не зарегистрирован");
    }

    const accessToken = authroizationHeader.split(" ")[1];
    if (!accessToken) {
      throw new Error("Пользователь не зарегистрирован");
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      throw new Error("Пользователь не зарегистрирован");
    }

    request.user = userData;
  } catch (error) {
    console.log(error);
  }
};
