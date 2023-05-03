import UserService from "./User.service";
import { RequestHandler, Router } from "express";
import Controller from "../../utils/interfaces/IController";
import w from "../../utils/helpers/promiseWrapper";

export default class UserController implements Controller {
  private service: UserService;
  constructor(public path = "user", public router = Router()) {
    this.service = new UserService();
    this.routes();
  }

  private routes() {
    this.router.post("/login", w(this.login));
    this.router.route("/").get(w(this.getUsers)).post(w(this.register));
  }

  private getUsers: RequestHandler = async (_, res) => {
    const users = await this.service.allUsers();
    res.json(users);
  };

  private register: RequestHandler = async (req, res) => {
    const user = await this.service.register(req.body);
    res.json(user);
  };

  private login: RequestHandler = async (req, res) => {
    const user = await this.service.login(req.body);
    res.json(user);
  };
}
