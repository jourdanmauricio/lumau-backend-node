const { config } = require('./../config/config');

// const USER = encodeURIComponent(config.dbUser);
// const PASSWORD = encodeURIComponent(config.dbPassword);
// const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
// const URI = config.databaseUrl;

module.exports = {
  //   development: {
  //     url: URI,
  //     dialect: 'postgres',
  //   },
  //   production: {
  //     url: URI,
  //     dialect: 'postgres',
  //   },
  development: {
    storage: `./db/${config.dbName}`,
    dialect: 'sqlite',
  },
  production: {
    storage: `./db/${config.dbName}`,
    dialect: 'sqlite',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};
