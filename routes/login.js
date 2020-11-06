const loginsRouters = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login, createUser } = require('../controllers/users.js');

loginsRouters.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().alphanum().min(4),
      email: Joi.string().required().email(),
      password: Joi.string().required().alphanum().min(4),
    }),
  }),
  createUser,
);

loginsRouters.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(4),
    }),
  }),
  login,
);

module.exports = { loginsRouters };