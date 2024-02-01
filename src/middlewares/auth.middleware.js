import jwt from "jsonwebtoken";
import { prisma } from "../utils/prisma/index.js";

export default async function (req, res, next) {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) throw new Error("사용자의 토큰이 존재하지 않습니다.");

    const [tokenType, token] = accessToken.split(" ");

    if (tokenType !== "Bearer")
      throw new Error("토큰 타입이 Bearer가 아닙니다.");

    const decodedToken = jwt.verify(token, "secret-key");
    const userId = decodedToken.userId;

    const user = await prisma.users.findFirst({
      where: { userId: +userId },
    });

    if (!user) throw new Error("토큰 사용자가 존재하지 않습니다.");

    req.user = user;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError")
      return res.status(401).json({ message: "토큰이 만료되었습니다" });
    if (error.name === "JsonWebTokenError")
      return res.status(401).json({ message: "토큰이 조작되었습니다." });
    return res.status(400).json({ message: error.message });
  }
}
