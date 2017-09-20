const router = require('express').Router();

const cfg = require('../config');
const { getSearchQuery } = require('../utils');
const manifest = require('../../dist/manifest.json');


const assetUrl = name => `/static/${manifest[name]}`;

router.use('/api', cfg.useFakeApi ? require('./fake_api') : require('./api'));

router.get('/search/:query', (req, res) => {
  const query = getSearchQuery(req.params.query);
  res.jsonp({
    query,
  });
});

router.use('*', (req, res) => {
  res.render('index', {
    assetUrl,
  });
});

module.exports = router;
