const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUsers, getUser } = require('../controllers/users');

usersRouter.get('/users',
  getUsers);

usersRouter.get('/users/me', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24).hex(),
  }),
}),
getUser);

module.exports = { usersRouter };
