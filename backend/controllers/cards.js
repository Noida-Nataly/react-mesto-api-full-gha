const Card = require('../models/card');
const InvalidDataError = require('../errors/invalid-data-err');
const NotFoundError = require('../errors/not-found-err');
const AccessDeniedError = require('../errors/access-denied-err');

module.exports.createCard = (req, res, next) => {
  const { _id } = req.user;
  const { name, link } = req.body;

  Card.create({ name, link, owner: _id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InvalidDataError('Переданы некорректные данные при создании карточки.'));
      } else {
        next(err);
      }
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => next(err));
};

module.exports.deleteCardById = (req, res, next) => {
  Card.findById(req.params.id)
    .orFail(new NotFoundError(`Карточка с указанным id:${req.params.id} не найдена`))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        return Promise.reject(new AccessDeniedError('Извините, но Вы не можете удалить чужое место'));
      }
      return Card.deleteOne(card)
        .then(() => res.send({ message: 'Место удалёно' }));
    })

    .catch((err) => {
      if (err.message === 'Извините, но Вы не можете удалить чужое место') {
        next(err);
      } else if (err.name === 'CastError') {
        next(new InvalidDataError('Некорректный идентификатор карты'));
      } else {
        next(err);
      }
    });
};

module.exports.likeCardById = (req, res, next) => {
  const { _id } = req.user;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: _id } },
    { new: true },
  )
    .orFail(new NotFoundError(`Передан несуществующий id:${cardId} карточки`))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InvalidDataError('Некорректный идентификатор карты'));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCardById = (req, res, next) => {
  const { _id } = req.user;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: _id } },
    { new: true },
  )
    .orFail(new NotFoundError(`Передан несуществующий id:${cardId} карточки`))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InvalidDataError('Некорректный идентификатор карты'));
      } else {
        next(err);
      }
    });
};
