const usersRouter = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
const { getUsers, getUser } = require('../controllers/users');

usersRouter.get('/users',
  getUsers);

usersRouter.get('/users/me',
  getUser);

module.exports = { usersRouter };
// celebrate({
//  params: Joi.object().keys({
//    name: Joi.string().required().min(2).max(30),
//    email: Joi.string().required().email(),
//  }),
// }),