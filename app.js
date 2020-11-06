require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const cors = require('cors');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const { errorLogger, requestLogger } = require('./middlewares/Logger');
// const { usersRouter } = require('./routes/users.js');
// const { articlesRouter } = require('./routes/articles.js');
const { router } = require('./routes/index.js');
const NotFoundError = require('./errors/not-found-err');
// const auth = require('./middlewares/auth.js');
// const { login, createUser } = require('./controllers/users.js');

const app = express();
app.use(helmet());

const { PORT = 3000 } = process.env;

const limit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Слишком много запросов!',
});

mongoose.connect('mongodb://localhost:27017/explorerdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cors());

app.use(limit);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

// app.post(
//  '/signup',
//  celebrate({
//    body: Joi.object().keys({
//      name: Joi.string().required().alphanum().min(4),
//      email: Joi.string().required().email(),
//      password: Joi.string().required().alphanum().min(4),
//    }),
//  }),
//  createUser,
// );
// app.post(
//  '/signin',
//  celebrate({
//    body: Joi.object().keys({
//      email: Joi.string().required().email(),
//      password: Joi.string().required().min(4),
//    }),
//  }),
//  login,
// );
// app.use(auth);

app.use('/', router);

// app.use('/', usersRouter);
// app.use('/', articlesRouter);
app.all('/*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`Вы на порту ${PORT}`);
});