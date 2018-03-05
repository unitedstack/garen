'use strict';

const assert = require('assert');

const ONE_DAY = 1000 * 60 * 60 * 24;

module.exports = app => {
  const name = app.config.sessionMemjs.name;
  const memClient = name ? app.memjs.get(name) : app.memjs;
  assert(memClient, `memjs instance [${name}] not exists`);

  app.sessionStore = {
    async get(key) {
      const res = await memClient.get(key);
      if (!res) return null;

      let {value, flags} = res;
      if (!value) {
        return null;
      } else {
        return JSON.parse(value.toString());
      }
    },

    async set(key, value, maxAge) {
      maxAge = maxAge ? parseInt(maxAge, 10) / 1000 : ONE_DAY;
      value = JSON.stringify(value);
      await memClient.set(key, value, maxAge);
    },

    async destroy(key) {
      await memClient.delete(key);
    },
  };
};