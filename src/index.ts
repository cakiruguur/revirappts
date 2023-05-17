import path from "path";
import fg from "fast-glob";
import dotenv from "dotenv";
import App from "./app";
import Routes from "./routes";
import Controller from "./utils/interfaces/IController";

dotenv.config();

const controllerFiles = fg.sync(path.join(__dirname, "Modules", "**/*Controller.ts"));
const controllers: Controller[] = controllerFiles.map(file => new (require(file).default)());

const app = new App();

new Routes(app.app, controllers);

app.start();
