const router = require('express').Router();

const cfg = require('../config');
const manifest = require('../../dist/manifest.json');


router.use('/api', cfg.useFakeApi ? require('./fake_api') : require('./api'));

router.use('*', (req, res) => {
  const assetUrl = (name) => {
    return `/static/${manifest[name]}`;
  };

  res.render('index', {
    assetUrl,
  });
});

module.exports = router;
