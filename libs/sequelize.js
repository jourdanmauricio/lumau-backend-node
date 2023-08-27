const { Sequelize } = require('sequelize');
const { config } = require('./../config/config');
const setupModels = require('./../db/models');

// const USER = encodeURIComponent(config.dbUser);
// const PASSWORD = encodeURIComponent(config.dbPassword);
// const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
// const URI = config.databaseUrl;
// const sequelize = new Sequelize(URI, {
//   dialect: 'postgres',
//   // eslint-disable-next-line no-console
//   logging: console.log,
// });

const options = {
  dialect: 'sqlite',
  storage: `./db/${config.dbName}`,
  // eslint-disable-next-line no-console
  logging: config.isProd ? false : console.log,
};

if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const sequelize = new Sequelize('lumau-db', 'user', 'pass', options);

setupModels(sequelize);

module.exports = sequelize;
