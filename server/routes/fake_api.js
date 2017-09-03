const _ = require('lodash');
const faker = require('faker');
const router = require('express').Router();


const { random, lorem, image, helpers } = faker;

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
    items: _.times(10, () => ({
      id: random.uuid(),
      title: lorem.sentence(),
      desc: lorem.sentences(),
    })),
  });
});

module.exports = router;
