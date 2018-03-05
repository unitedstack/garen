'use strict';

const path = require('path');
const Joi = require('joi');
const _ = require('lodash');

module.exports = app => {
  //const defaultLang = themeConfig.defaultLang;

  //i18n & user info
  // app.router.use(async (ctx, next) => {
  //   if (ctx.request.query && ctx.request.query.lang && ctx.session.lang !== ctx.request.query.lang) {
  //     ctx.session.lang = ctx.request.query.lang;
  //   }
  //   if (!ctx.session.lang) {
  //     ctx.session.lang = defaultLang;
  //   }
  //   await next();
  // });

  //home page
  //view
  app.router.get('/', 'view.index');
  app.router.get('/login', 'view.login');
  app.router.get('/logout', 'view.logout');
  app.router.get('*', 'view.index');
};
