const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');

const getArticle = (req, res, next) => {
  Article.find({})
    .then((articles) => {
      res.status(200).send({ articles });
    }).catch(() => {
      throw new NotFoundError('Запрашиваемый ресурс не найден');
    })
    .catch(next);
};

const addArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((data) => {
      res.send(data);
    }).catch(() => {
      throw new BadRequestError('Переданы некорректные данные в метод создания карточки');
    })
    .catch(next);
};
const deleteArticle = (req, res, next) => {
  Article.findByIdAndRemove(req.params.articleId)
    .orFail(new Error('Not Found'))
    .then((article) => res.send({ data: article })).catch(() => {
      throw new NotFoundError('Переданы некорректные данные в метод удаления карточки');
    })
    .catch(next);
};
module.exports = { getArticle, addArticle, deleteArticle };