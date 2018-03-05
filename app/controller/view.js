'use strict';
const Joi = require('joi');

const Controller = require('egg').Controller;

class ViewController extends Controller {
  async index() {

    const ctx = this.ctx;
    let view = ctx.session.view;
    //let view = 1;
    ctx.session.view = view = view ? ++view : 1;

    
    //this.ctx.body = 'hi, tfcloud. view:' + view + ctx.__('Email');
    this.ctx.body = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>UDS</title>
        <link href="/public/dist/dashboard.min.css" rel="stylesheet"/>
      </head>
      <body>
        <div id="container"></div>
        <script src="/public/dist/dll/dll_ustack.js"></script>
        <script src="/public/dist/dashboard.min.js"></script>
      </body>
      </html>`;
  }

  async register() {
    this.ctx.validate({
      body: {
        email: Joi.string().email().required(),
        // password: Joi.string().required()
      },
      query: {
        userId: Joi.string().required(),
        wuli: Joi.string().required()
      },
    });
    this.ctx.body = 'hi, register';
  }

  async login() {
    this.ctx.body = 'hi, login';
  }

  async logout() {
    this.ctx.session = null;
    this.ctx.redirect('/');
  }
}

module.exports = ViewController;
