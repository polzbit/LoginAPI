import { Joi } from 'express-validation';

const userValidation = {
  login: {
    body: Joi.object({
      email: Joi.string().max(80),
      password: Joi.string().max(80),
    }),
  },
  register: {
    body: Joi.object({
      email: Joi.string().max(80),
      password: Joi.string().max(80),
      passwordRepeat: Joi.string().max(80),
    }),
  },
  forgotPassword: {
    body: Joi.object({
      email: Joi.string().max(80).required(),
    }),
  },
  resetPassword: {
    body: Joi.object({
      token: Joi.string(),
      password: Joi.string().max(80),
      passwordRepeat: Joi.string().max(80),
    }),
  },
};

export default userValidation;
