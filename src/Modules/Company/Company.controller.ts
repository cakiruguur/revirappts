import { RequestHandler, Router } from "express";
import w from "../../utils/helpers/promiseWrapper";
import Controller from "../../utils/interfaces/IController";
import Company, { ICompany } from "./Company.model";

export default class CompanyController implements Controller {
  constructor(public path = "company", public router = Router()) {
    this.routes();
  }

  private routes() {
    this.router.get("/:id", w(this.getCompany));
    this.router.route("/").get(w(this.getAll)).post(w(this.addCompany));
  }

  private addCompany: RequestHandler = async (req, res) => {
    const company: ICompany = req.body;
    const newCompany = await Company.create(company);
    res.send(newCompany);
  };

  private getCompany: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const company = await Company.findByPk(id);
    res.send(await company?.$get('employees'));
  };

  private getAll: RequestHandler = async (_, res) => {
    const companies = await Company.findAll();
    res.send(companies);
  };
}
