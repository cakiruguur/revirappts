import { RequestHandler, Router } from "express";
import w from "@utils/helpers/promiseWrapper";
import Controller from "@utils/interfaces/IController";
import {Company} from "@modules/Company";
import {Employee, IEmployee } from "./index";

export default class EmployeeController implements Controller {
  constructor(public path = "employee", public router = Router()) {
    this.routes();
  }

  private routes() {
    this.router.get("/:id", w(this.getEmployee));
    this.router.route("/").get(w(this.getAll)).post(w(this.addEmployee));
  }

  private addEmployee: RequestHandler = async (req, res) => {
    const employee: IEmployee = req.body;
    const newEmployee = await Employee.create(employee);
    res.send(newEmployee);
  };

  private getEmployee: RequestHandler = async (req, res) => {
    const {id} = req.params;
    const employee = await Employee.findByPk(id,{include : Company});

    res.send(employee);
  };

  private getAll: RequestHandler = async (_, res) => {
    const employees = await Employee.findAll();
    res.send(employees);
  };
}
