'use strict';

const memjs = require('memjs');


module.exports = app => {
  const config = app.config.memjs;

  const client  = memjs.Client.create(config.remotes.join(','));

  app.memjs = client;

};