import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";

import errorMiddleware from "@middlewares/error.middleware";
import db from "@database/sequelize"

import { UserController } from "@modules/User";
import { CompanyController } from "@modules/Company";
import { EmployeeController } from "@modules/Employee";

export default class App {
  public app: Application;
  private readonly port: string;

  constructor() {
    this.port = process.env.SERVER_PORT || "3000";
    this.app = express();

    this.initMiddleware();
    this.initErrorHandle();
  }

  private initMiddleware() {
    this.app.use(helmet());
    this.app.use(cors({ origin: "*" }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initControllers() {
    const controllers = [
      new UserController(),
      new CompanyController(),
      new EmployeeController(),
    ];

    controllers.forEach((controller) => {
      this.app.use(`/api/${controller.path}`, controller.router);
    });
  }

  private initErrorHandle() {
    this.app.use(errorMiddleware);
    process.on("uncaughtException", (e) => {
      console.log("catching with process", e);
    });
  }

  public start() {
    this.app.listen(this.port, async () => {
      await db.authenticate();
      console.log("database connection is successfully");
      console.log(`Server is alive on: ${this.port} `);
    });
  }
}
