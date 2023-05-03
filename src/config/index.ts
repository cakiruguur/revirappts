import path from "path";
export default {
  db: {
    dialect: "mysql",
    database: "revirapp",
    host: "localhost",
    username: "root",
    password: "123456ucc",
    models: [`${path.resolve(__dirname, "..", "Modules")}/**/*.model.*`],
  },
};
