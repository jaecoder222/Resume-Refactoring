export class UsersService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  signUp = async (email, password, name, age, gender) => {
    const signup = await this.usersRepository.signUp(
      email,
      password,
      name,
      age,
      gender,
    );

    return {
      userId: signup.userId,
      email: signup.email,
      name: signup.name,
      createdAt: signup.createdAt,
      updatedAt: signup.updatedAt,
    };
  };

  signIn = async (email, password) => {
    const signin = await this.usersRepository.signIn(email, password);

    return {
      userId: signin.userId,
      email: signin.email,
      name: signin.name,
      createdAt: signin.createdAt,
      updatedAt: signin.updatedAt,
    };
  };

  findUser = async (userId) => {
    const user = await this.usersRepository.findUserById(userId);

    return {
      userId: user.userId,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  };
}
