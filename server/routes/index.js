import { Router } from "express";
import authController from "../controllers/authController.js";
import { check } from "express-validator";

const router = new Router();

router.post("/login", authController.login);
router.post(
  "/registration",
  [
    check("username", "Имя пользователя не может быть пустым!").notEmpty(),
    check("password", "Пароль должен содержать минимум 3 символа!").isLength({
      min: 3,
      max: 32,
    }),
  ],
  authController.registration
);
router.post("/logout", authController.logout);
router.get("/refresh", authController.refresh);
router.get("/users", authController.getUsers);

export default router;
