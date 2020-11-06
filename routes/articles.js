const articlesRouter = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
const {
  getArticle, addArticle, deleteArticle,
} = require('../controllers/articles');

articlesRouter.get('/articles', getArticle);
articlesRouter.post('/articles', addArticle);
articlesRouter.delete('/articles/:articleId', deleteArticle);

module.exports = { articlesRouter };