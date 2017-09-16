const _ = require('lodash');
const faker = require('faker');
const moment = require('moment');
const router = require('express').Router();
const { Base64 } = require('js-base64');

const {
  RESEARCH_DESIGN, SE_METHOD, SE_METHODOLOGY, SORT_BY_METHOD,
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
      method: SE_METHOD,
      methodology: SE_METHODOLOGY,
    };
    return _.sample(_.values(options[name]));
  };

  const query = JSON.parse(Base64.decode(req.query.query));
  const items = _.times(15, () => ({
    id: random.uuid(),
    title: lorem.sentence(),
    authors: _.times(_.random(1, 3)).map(() => faker.name.findName()).join(', '),
    year: moment(date.past()).year(),
    rating: _.round(_.random(5, true), 1),
    design: attrGenerator('design'),
    method: attrGenerator('method'),
    methodology: attrGenerator('methodology'),
  }));

  if (!_.isEmpty(query.sortBy)) {
    const { key, order } = query.sortBy;
    const reverse = order === SORT_BY_METHOD.ASC ? 1 : -1;

    items.sort((a, b) => {
      a = a[key];
      b = b[key];
      return reverse * ((a > b) - (b > a));
    });
  }

  res.jsonp({
    items,
    total: 200,
  });
});

module.exports = router;
