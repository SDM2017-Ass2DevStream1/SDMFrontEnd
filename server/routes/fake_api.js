const _ = require('lodash');
const faker = require('faker');
const moment = require('moment');
const router = require('express').Router();
const { Base64 } = require('js-base64');

const {
  RESEARCH_DESIGN, SE_METHOD, SE_METHODOLOGY, SORT_BY_METHOD,
  SEARCH_FIELD_OPERATORS, SEARCH_CONDITION_FIELD_TYPE,
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

  let query;
  try {
    query = JSON.parse(Base64.decode(req.query.query));
  } catch (err) {
    query = {};
  }

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

router.get('/saved_queries', (req, res) => {
  const items = _.times(15, () => {
    const item = {
      id: random.uuid(),
      term: lorem[_.sample(['word', 'words'])](),
      conditions: [],
    };

    _.times(_.random(4), () => {
      const field = _.sample(_.values(SEARCH_CONDITION_FIELD_TYPE));
      const { operators, options } = SEARCH_FIELD_OPERATORS[field];
      item.conditions.push({
        type: _.sample([1, 2]),
        field,
        operator: _.sample(operators).type,
        option: options ? _.sample(options).type : lorem.words(),
      });
    });

    return item;
  });

  res.jsonp({
    items,
    total: 50,
  });
});

module.exports = router;
