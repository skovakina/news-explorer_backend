const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

module.exports.validateArticleBody = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().messages({
      "string.empty": '"keyword" field must be filled in',
    }),
    title: Joi.string().required().messages({
      "string.empty": '"title" field must be filled in',
    }),
    content: Joi.string().required().messages({
      "string.empty": '"text" field must be filled in',
    }),
    publishedAt: Joi.string().required().messages({
      "string.empty": '"date" field must be filled in',
    }),
    source: Joi.string().required().messages({
      "string.empty": '"source" field must be filled in',
    }),
    url: Joi.string().custom(validateURL).messages({
      "string.empty": '"link" field must be filled in',
      "string.uri": '"link" field must be a valid URL',
    }),
    urlToImage: Joi.string().custom(validateURL).messages({
      "string.empty": '"image" field must be filled in',
      "string.uri": '"image" field must be a valid URL',
    }),
  }),
});

module.exports.validateSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    email: Joi.string().email().required().messages({
      "string.empty": 'The "Email" field must be filled in',
      "string.email": 'the "Email" field must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "Password" field must be filled in',
    }),
  }),
});

module.exports.validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required().messages({
      "string.empty": 'The "Email" field must be filled in',
      "string.email": 'the "Email" field must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "Password" field must be filled in',
    }),
  }),
});

module.exports.validateId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).required().messages({
      "string.empty": "id is required",
      "string.hex": "incorrect id value hex",
      "string.length": "incorrect id value length",
    }),
  }),
});
