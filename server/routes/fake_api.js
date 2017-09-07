const _ = require('lodash');
const faker = require('faker');
const moment = require('moment');
const router = require('express').Router();

const { SE_METHODS } = require('../../src/constants');


const { random, lorem, image, helpers, date } = faker;

const createUser = () => ({
  ...helpers.userCard(),
  ...{
    avatar: image.avatar(),
  },
});

router.get('/current_user', (req, res) => {
  res.jsonp(createUser());
});

router.get('/user/login', (req, res) => {
  res.jsonp({
    ok: true,
  });
});

router.get('/user/logout', (req, res) => {
  res.jsonp({
    ok: true,
  });
});

router.get('/search', (req, res) => {
  res.jsonp({
    items: _.times(15, () => ({
      id: random.uuid(),
      title: lorem.sentence(),
      authors: _.times(_.random(1, 3)).map(() => faker.name.findName()).join(','),
      year: moment(date.past()).year(),
      rating: _.round(_.random(5, true), 1),
      method: _.sample(SE_METHODS.map(item => item.name)),
    })),
    total: 200,
  });
});

module.exports = router;
