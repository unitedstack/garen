'use strict';

const {join} = require('path');

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1519627453125_7047';

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'garen',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: '1234',
  };
  // add your config here
  config.middleware = [];

  config.i18n = {
    defaultLocale: 'cn',
  };

  exports.static = {
    // maxAge: 31536000,
    dir: join(appInfo.baseDir, 'client/public')
  };
  

  return config;

};
