import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();

export class UsersController {
  constructor(usersService) {
    this.usersService = usersService;
  }

  userSignUp = async (req, res, next) => {
    try {
      const { email, password, verifyPassword, name, age, gender } = req.body;

      if (!email)
        return res.status(400).json({ message: "이메일은 필수값입니다." });
      if (!password)
        return res.status(400).json({ message: "비밀 번호는 필수값입니다." });
      if (!verifyPassword)
        return res
          .status(400)
          .json({ message: "비밀 번호 확인은 필수값입니다." });
      if (password !== verifyPassword)
        return res
          .status(400)
          .json({ message: "비밀 번호와 비밀 번호 확인이 일치하지 않습니다." });
      if (!name) res.status(400).json({ message: "이름은 필수 값입니다." });

      const signup = await this.usersService.signUp(
        email,
        password,
        name,
        age,
        gender,
      );

      return res.status(201).json({ data: signup });
    } catch (err) {
      next(err);
    }
  };

  userSignIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email) throw new Error("이메일을 입력해 주세요.");
      if (!password) throw new Error("비밀 번호를 입력해 주세요.");

      const signin = await this.usersService.signIn(email, password);

      const accessToken = jwt.sign(
        { userId: signin.userId },
        process.env.TOKEN_SECRET_KEY,
        {
          expiresIn: "12h",
        },
      );

      const refreshToken = jwt.sign(
        { userId: signin.userId },
        process.env.TOKEN_SECRET_KEY,
        {
          expiresIn: "7d",
        },
      );

      res.cookie("accessToken", `Bearer ${accessToken}`);
      res.cookie("refreshToken", `Bearer ${refreshToken}`);

      return res.status(200).json({ data: signin });
    } catch (err) {
      next(err);
    }
  };

  // findUser = async (req, res, next) => {
  //   try {
  //     const { userId } = req.user;
  //     const user = await this.usersService.findUser(userId);

  //     return res.status(200).json({ data: user });
  //   } catch (err) {
  //     next(err);
  //   }
  // };
}
