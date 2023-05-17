import path from "path";
import dotenv from "dotenv";
import fg from "fast-glob";

dotenv.config();
const models = fg.sync(path.join(__dirname, "..", "Modules", "**/*.model.*"));
const database = {
  db: {
    dialect: process.env.DB_DIALECT,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    models,
  },
};

export default database;