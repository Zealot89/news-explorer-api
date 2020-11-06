const router = require('express').Router();
const { usersRouter } = require('./users.js');
const { articlesRouter } = require('./articles.js');
const { loginsRouters } = require('./login.js');
const auth = require('../middlewares/auth.js');

router.use('/', loginsRouters);

router.use(auth);

router.use('/', articlesRouter, usersRouter);

module.exports = { router };