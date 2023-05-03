import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import db from "./database/sequelize";
import errorMiddleware from "./middleware/error.middleware";
import Controller from "./utils/interfaces/IController";

export default class App {
  private app: Application;
  private PORT: number;
  constructor(Controllers: Controller[], port: number) {
    this.app = express();
    this.PORT = port;
    this.initMiddleware();
    this.initRoutes(Controllers);
    this.initErrorHandle();
  }

  private initMiddleware() {
    this.app.use(helmet());
    this.app.use(cors({ origin: "*" }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initRoutes(Controllers: Controller[]) {
    Controllers.forEach((controller) => {
      this.app.use(`/api/${controller.path}`, controller.router);
    });
  }

  private initErrorHandle() {
    this.app.use(errorMiddleware);
    process.on("uncaughtException", (e) => {
      console.log("Process ile yakalandı", e);
    });
  }

  public start() {
    this.app.listen(this.PORT, async () => {
      await db.authenticate();
      console.log("Veritabanı bağlantısı başarılı.");
      console.log(`Server ${this.PORT} portu üzerinden çalışıyor`);
    });
  }
}
