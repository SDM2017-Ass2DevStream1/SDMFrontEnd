const _ = require('lodash');
const kit = require('nokit');


const cfg = {
  port: 3000,
  ip: '0.0.0.0',
  useFakeApi: false,
};

let localCfg = {};
if (kit.fileExists('./local_config.js')) {
  /* eslint-disable */
  localCfg = require('./local_config');
  /* eslint-enable */
}

module.exports = _.merge(cfg, localCfg);
