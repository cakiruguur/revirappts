import path from 'path';
import { Sequelize } from 'sequelize-typescript';
import database from '@configs/database';

const sequelize = new Sequelize({
    dialect: database.db.dialect as 'mysql' | 'mariadb' | 'postgres' | 'mssql',
    database: database.db.database,
    username: database.db.username,
    password: database.db.password,
    host: database.db.host,
    models: [path.join(__dirname, '../Modules/*/models/*.model.ts')]
});

sequelize.sync({});

export default sequelize;
