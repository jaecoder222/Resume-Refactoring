import bcrypt from "bcrypt";

export class UsersRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  signUp = async (email, password, name, age, gender) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const createUser = await this.prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        name,
        age,
        gender,
      },
    });

    return createUser;
  };

  signIn = async (email, password) => {
    const signinUser = await this.prisma.users.findFirst({
      where: { email },
    });

    if (!signinUser) throw new Error("유저가 존재하지 않습니다.");
    if (!(await bcrypt.compare(password, signinUser.password)))
      throw new Error("비밀 번호가 일치하지 않습니다.");

    return signinUser;
  };

  // findUserById = async (userId) => {
  //   if (!userId) throw new Error("유저가 존재하지 않습니다.");
  //   const findUser = await this.prisma.users.findUnique({
  //     where: { userId },
  //     select: {
  //       userId: true,
  //       email: true,
  //       name: true,
  //       createdAt: true,
  //       updatedAt: true,
  //     },
  //   });
  //   return findUser;
  // };
}
