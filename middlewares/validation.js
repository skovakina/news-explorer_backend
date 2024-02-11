const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

module.exports.validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    imageUrl: Joi.string().custom(validateURL).required().messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
    weather: Joi.string().required().valid("hot", "warm", "cold"),
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

module.exports.validateEditProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    avatar: Joi.string().uri().required().messages({
      "string.empty": 'The "Avatar" field must be filled in',
      "string.uri": 'the "Avatar" field must be a valid url',
    }),
  }),
});

module.exports.validateId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).required().messages({
      "string.empty": "id is required",
      "string.hex": "incorrect id value",
      "string.length": "incorrect id value",
    }),
  }),
});
