const router = require('express').Router();
const cfg = require('../config');


router.use('/api', cfg.useFakeApi ? require('./fake_api') : require('./api'));

module.exports = router;
