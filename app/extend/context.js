const Joi = require('joi');
const _ = require('lodash');

module.exports = {
  validate(schema = {}) {
    const {opt = {}} = schema;
    const options = Object.assign({
      allowUnknown: true,
    }, opt);
    const defaultValidateKeys = ['body', 'query', 'params', 'headers'];
    const needValidateKeys = _.intersection(defaultValidateKeys, Object.keys(schema));

    const errors = [];
    needValidateKeys.forEach((item) => {
      const toValidateObj = item === 'body' ? this.request.body : this[item];
      const result = Joi.validate(toValidateObj, schema[item], options);
      if (result.error) {
        console.log(result.error.details);
        let errDetail = result.error.details[0];
        errDetail.location = item;
        errors.push(errDetail);
        //return true;
      }
      _.assignIn(toValidateObj, result.value);
      return false;
    });


    if (errors.length !== 0) {
      const msg = errors[0].message.replace(/"/g, '#');
      const error = new Error(msg);
      error.status = 400;
      this.throw(error);
    }
  }
};
