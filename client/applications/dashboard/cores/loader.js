/**
 * @func load modules dynamically
 */
import configs from '../config.json';

let modules = {};
configs.modules.forEach((m) => {
  m.items.forEach((n) => {
    modules[n] = require('../modules/' + n + '/model');
  });
});
// configs.linkedModules.forEach((m) => {
//   modules[m] = require('../modules/' + m + '/model');
// });

module.exports = {
  configs: configs,
  modules: modules
};
