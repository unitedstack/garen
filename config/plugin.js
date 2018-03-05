'use strict';
const {join} = require('path');

exports.i18n = true;

exports.session = true;

exports.memjs = {
  enable: true,
  path: join(__dirname, '../lib/plugin/egg-memjs')
}

exports.sessionMemjs = {
  enable: true,
  path: join(__dirname, '../lib/plugin/egg-session-memjs')
}

exports.ejs = {
  enable: true,
  package: 'egg-view-ejs',
};

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

