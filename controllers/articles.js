const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

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
  Article.findById(req.params.articleId).select('+owner')
    .orFail(new NotFoundError('Переданы некорректные данные в метод удаления карточки'))
    .then((article) => {
      if (!article.owner._id.equals(req.user._id)) {
        throw new ForbiddenError('Вы не можете удалять чужие карточки');
      }
      Article.remove(article)
        .then(() => res.send({ data: article }));
    })

    .catch(next);
};
module.exports = { getArticle, addArticle, deleteArticle };
