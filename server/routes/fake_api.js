const router = require('express').Router();


router.get('/search', (req, res) => {
  res.jsonp({
    query: {
      term: 'fake_api',
    },
    items: [
      {
        id: '1',
        title: 'Title 1',
        desc: 'Description 1',
      },
      {
        id: '2',
        title: 'Title 2',
        desc: 'Description 2',
      },
    ],
  });
});

module.exports = router;
