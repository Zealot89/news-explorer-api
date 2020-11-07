const router = require('express').Router();
const { usersRouter } = require('./users.js');
const { articlesRouter } = require('./articles.js');
const { loginsRouters } = require('./login.js');
const auth = require('../middlewares/auth.js');
const NotFoundError = require('../errors/not-found-err');

router.use('/', loginsRouters);

router.use(auth);

router.use('/', articlesRouter, usersRouter);
router.all('/*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});
module.exports = { router };
