const _ = require('lodash');


const cfg = {
  port: 3000,
  ip: '0.0.0.0',
  useFakeApi: false,
  sentry: 'https://948bf30d5848446e9be83bdc8483a700:c925b1e6a4c8415d986a49df3195d788@sentry.io/220530',
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
