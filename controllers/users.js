const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const AuthError = require('../errors/auth-err');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200).send({ data: users });
    }).catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new Error();
      } else {
        res.send({ email: user.email, name: user.name });
      }
    }).catch(() => {
      throw new NotFoundError('Пользователь не найден');
    }).catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((newUser) => {
      res.send({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      });
    }).catch((error) => {
      if (error.name === 'MongoError' || error.code === 11000) {
        throw new ConflictError('такой email уже зарегистрирован');
      }
      throw new BadRequestError('переданы некорректные данные в метод создания пользователя');
    })
    .catch(next);
};

function login(req, res, next) {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password).then((user) => {
    res.send({ token: jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' }) });
  }).catch((err) => {
    // ошибка аутентификации
    throw new AuthError(err.message);
  })
    .catch(next);
}

module.exports = {
  getUsers, createUser, login, getUser,
};
