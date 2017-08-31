const _ = require('lodash');
const faker = require('faker');
const router = require('express').Router();


const { random, lorem } = faker;

router.get('/search', (req, res) => {
  res.jsonp({
    query: {
      term: 'fake_api',
    },
    items: _.times(10, () => ({
      id: random.uuid(),
      title: lorem.sentence(),
      desc: lorem.sentences(),
    })),
  });
});

module.exports = router;
