import express from "express";
import { prisma } from "../utils/prisma/index.js";
import dotenv from "dotenv";
import authMiddleware from "../middlewares/auth.middleware.js";
import { UsersRepository } from "../repositories/users.repository.js";
import { UsersService } from "../services/users.service.js";
import { UsersController } from "../controllers/users.controller.js";

dotenv.config();

const router = express.Router();
const usersRepository = new UsersRepository(prisma);
const usersService = new UsersService(usersRepository);
const usersController = new UsersController(usersService);

// 회원가입
router.post("/sign-up", usersController.userSignUp);
// 로그인
router.post("/sign-in", usersController.userSignIn);
// 유저 조회
router.get("/", authMiddleware, usersController.findUser);

export default router;
