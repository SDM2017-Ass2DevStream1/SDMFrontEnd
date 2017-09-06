const _ = require('lodash');


const cfg = {
  port: 3000,
  ip: '0.0.0.0',
  useFakeApi: true,
};

let localCfg;
/* eslint-disable */
try {
  localCfg = require('./local_config');
} catch (err) {
  localCfg = {};
}
/* eslint-enable */

module.exports = _.merge(cfg, localCfg);
