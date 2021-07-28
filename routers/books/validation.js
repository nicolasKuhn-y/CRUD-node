const Joi = require("joi");

function validateBook({ title, rating }) {
  const schema = Joi.object({
    title: Joi.string().required().min(3).max(50),
    rating: Joi.number().min(1).max(10),
  });

  return schema.validate({ title, rating });
}

module.exports = validateBook;
