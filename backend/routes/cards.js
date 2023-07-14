const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');
const { regex } = require('../utils/constants');

const {
  createCard,
  getCards,
  deleteCardById,
  dislikeCardById,
  likeCardById,
} = require('../controllers/cards');

router.get('/', getCards);
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      link: Joi.string().pattern(regex).required(),
    }),
  }),
  createCard,
);
router.delete(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().length(24).required().hex(),
    }),
  }),
  deleteCardById,
);
router.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).required().hex(),
    }),
  }),
  likeCardById,
);
router.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).required().hex(),
    }),
  }),
  dislikeCardById,
);

module.exports = router;
