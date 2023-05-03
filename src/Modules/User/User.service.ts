import HttpException from "../../utils/exceptions/http.exception";
import User, { IUser } from "./User.model";
import jwt from "jsonwebtoken";

class UserService {
  private model = User;

  async allUsers() {
    const users = await this.model.findAll();
    return users;
  }

  async register(attributes: IUser) {
    const { name, username, password } = attributes;
    const newUser = await User.create({ name, username, password });
    return newUser;
  }

  async login(credentials: IUser) {
    const { username, password } = credentials;
    const user = await User.findOne({
      where: { username },
    });
    if (!user) throw new HttpException(404, "Kullanıcı bulunamadı");
    const verify = await user.validPassword(password);
    if (!verify) throw new HttpException(401, "Parola doğru değil");
    return user;
  }
}

export default UserService;
