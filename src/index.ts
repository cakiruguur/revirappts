import App from "./app";
import CompanyController from "./Modules/Company/Company.controller";
import EmployeeController from "./Modules/Employee/Employee.controller";
import UserController from "./Modules/User/User.controller";

const server = new App([new UserController(), new CompanyController(), new EmployeeController()], 3000);

server.start();
