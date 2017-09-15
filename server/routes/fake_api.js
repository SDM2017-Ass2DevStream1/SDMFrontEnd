const _ = require('lodash');
const faker = require('faker');
const moment = require('moment');
const router = require('express').Router();

const {
  RESEARCH_DESIGN, SE_METHODS, SE_METHODOLOGIES,
} = require('../../src/constants');


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
  const attrGenerator = (name) => {
    const options = {
      design: RESEARCH_DESIGN,
      method: SE_METHODS,
      methodology: SE_METHODOLOGIES,
    };
    return _.sample(options[name].map(item => item.name));
  };

  res.jsonp({
    items: _.times(15, () => ({
      id: random.uuid(),
      title: lorem.sentence(),
      authors: _.times(_.random(1, 3)).map(() => faker.name.findName()).join(', '),
      year: moment(date.past()).year(),
      rating: _.round(_.random(5, true), 1),
      design: attrGenerator('design'),
      method: attrGenerator('method'),
      methodology: attrGenerator('methodology'),
    })),
    total: 200,
  });
});

module.exports = router;
