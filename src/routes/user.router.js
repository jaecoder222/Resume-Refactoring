import express from "express";
import { prisma } from "../utils/prisma/index.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import dotenv from "dotenv";
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
//router.get("/", authMiddleware, usersController.findUser);

// router.post("/sign-up", async (req, res, next) => {
//   try {
//     const {
//       clientId,
//       email,
//       password,
//       verifyPassword,
//       name,
//       age,
//       gender,
//       profileImage,
//       grade,
//     } = req.body;

//     if (grade && !["user", "admin"].includes(grade))
//       return res.status(400).json({ message: "등급이 올바르지 않습니다." });

//     if (clientId) {
//       const user = await prisma.users.findFirst({
//         where: { clientId },
//       });

//       if (user)
//         return res.status(409).json({ message: "이미 가입된 사용자 입니다." });

//       const kakaoUser = await prisma.users.create({
//         data: {
//           clientId,
//           name,
//           grade,
//         },
//       });
//       return res.status(201).json({ message: "회원가입이 완료되었습니다." });
//     } else {
//       if (!email)
//         return res.status(400).json({ message: "이메일은 필수값입니다" });
//       if (!password)
//         return res.status(400).json({ message: "비밀번호는 필수값입니다" });
//       if (!verifyPassword)
//         return res
//           .status(400)
//           .json({ message: "비밀번호 확인은 필수값입니다" });
//       if (password.length < 6 || password !== verifyPassword) {
//         return res.status(401).json({
//           message:
//             "비밀번호는 최소 6자 이상이며, 비밀번호 확인과 일치해야합니다.",
//         });
//       }

//       const isExisUser = await prisma.users.findFirst({
//         where: { email },
//       });

//       if (isExisUser) {
//         return res.status(409).json({ message: "이미 존재하는 아이디입니다." });
//       }

//       const hashedPassword = await bcrypt.hash(password, 10);

//       const [user, userInfo] = await prisma.$transaction(
//         async (tx) => {
//           const user = await tx.users.create({
//             data: {
//               email,
//               password: hashedPassword,
//               name,
//               grade,
//             },
//           });

//           const userInfo = await tx.userInfo.create({
//             data: {
//               userId: user.userId,
//               age,
//               gender,
//               profileImage,
//             },
//           });

//           return [user, userInfo];
//         },
//         {
//           isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted,
//         },
//       );

//       return res.status(201).json({ message: "회원가입이 완료되었습니다." });
//     }
//   } catch (err) {
//     console.error(err);
//   }
// });

// const tokenStorages = {};
// router.post("/sign-in", async (req, res, next) => {
//   const { clientId, email, password } = req.body;
//   let user;

//   if (clientId) {
//     user = await prisma.users.findFirst({
//       where: { clientId },
//     });

//     if (!user)
//       return res
//         .status(401)
//         .json({ message: "올바르지 않은 로그인 정보입니다." });
//   } else {
//     user = await prisma.users.findFirst({
//       where: { email },
//     });

//     if (!user)
//       return res.status(401).json({ message: "이메일이 존재하지 않습니다." });
//     if (!(await bcrypt.compare(password, user.password)))
//       return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
//   }

// const accessToken = jwt.sign(
//   { userId: user.userId },
//   process.env.TOKEN_SECRET_KEY,
//   {
//     expiresIn: "12h",
//   },
// );
// const refreshToken = jwt.sign(
//   { userId: user.userId },
//   process.env.TOKEN_SECRET_KEY,
//   {
//     expiresIn: "7d",
//   },
// );

// tokenStorages[refreshToken] = {
//   userId: user.userId,
//   ip: req.ip,
//   userAgent: req.headers["user-agent"],
// };

//   res.cookie("accessToken", `Bearer ${accessToken}`);
//   res.cookie("refreshToken", `Bearer ${refreshToken}`);
//   return res.status(200).json({ message: "로그인에 성공하였습니다." });
// });

// router.get("/users", authMiddleware, async (req, res, next) => {
//   const { userId } = req.user;

//   const user = await prisma.users.findFirst({
//     where: { userId: +userId },
//     select: {
//       userId: true,
//       email: true,
//       name: true,
//       createdAt: true,
//       updatedAt: true,
//       userInfo: {
//         select: {
//           age: true,
//           gender: true,
//           profileImage: true,
//         },
//       },
//     },
//   });

//   return res.status(200).json({ data: user });
// });

export default router;
