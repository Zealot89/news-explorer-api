const router = require('express').Router();
const { usersRouter } = require('./users.js');
const { articlesRouter } = require('./articles.js');

router.use('/', articlesRouter);
router.use('/', usersRouter);

module.exports = { router };