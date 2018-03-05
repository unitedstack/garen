'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async login() {
    this.ctx.body = 'hi, login';
  }
}

module.exports = LoginController;
