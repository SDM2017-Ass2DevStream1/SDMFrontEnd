module.exports = (app) => {
  app.use('/api', (req, res, next) => {
    req.headers.accept = 'application/json';
    next();
  });

  app.get('/api/test', (req, res) => {
    res.jsonp({
      code: 1,
      data: 'test',
    });
  });
};
