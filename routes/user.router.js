import express from "express";
import { prisma } from "../src/utils/prisma/index.js";
import { Prisma } from "@prisma/client";

const router = express.Router();

router.post("/sign-up", async (req, res, next) => {
  try {
    const { email, password, verifyPassword, name } = req.body;

    const isExisUser = await prisma.users.findFirst({
      where: { email, password, verifyPassword },
    });

    if (isExisUser)
      return res.status(409).json({ message: "이미 존재하는 아이디입니다." });

    if (password.lenght >= 6 && password === verifyPassword) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const [user, userInfo] = await prisma.$transaction(
        async (tx) => {
          const user = await tx.users.create({
            data: {
              email,
              paswword: hashedPassword,
            },
          });

          const userInfo = await tx.userInfo.create({
            data: {
              user: user.userId,
              name,
              age,
              gender,
              profileImage,
            },
          });

          return [user, userInfo];
        },
        {
          isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted,
        }
      );
    }
    if (password.lenght < 6 || password !== verifyPassword) {
      return res.status(401).json({
        message:
          "비밀번호는 최소 6자 이상이며, 비밀번호 확인과 일치해야합니다.",
      });
    }

    return res.status(200).json({ message: "회원가입이 완료되었습니다." });
  } catch (err) {
    console.error(err);
  }
});

export default router;
