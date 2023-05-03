import { Sequelize } from "sequelize-typescript";
import config from "../config";

const sequelize = new Sequelize(config.db as object);

// sequelize.models.User.sync({})
// sequelize.models.Company.sync({})

sequelize.sync({})

export default sequelize;
