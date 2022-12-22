import Joi from 'joi';

const NUMBER_REG = /\d/;
const UPPER_REG = /[A-Z]/;
const LOWER_REG = /[a-z]/;
const SPECIAL_REG = /[\^#*~!$%?@&]+/;

export const passwordMethod = (value: string) => {
  switch (true) {
    case !NUMBER_REG.test(value):
      return 'password.number';
    case !UPPER_REG.test(value):
      return 'password.upper';
    case !LOWER_REG.test(value):
      return 'password.lower';
    case !SPECIAL_REG.test(value):
      return 'password.special';
    default:
      return value;
  }
};

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.base': 'emailNotValid',
      'string.empty': 'emailNotValid',
      'string.email': 'emailNotValid',
    }),
  password: Joi.string()
    .min(8)
    .custom(passwordMethod, 'password')
    .required()
    .messages({
      'string.base': 'passwordEmpty',
      'string.empty': 'passwordEmpty',
      'string.min': 'passwordShort',
      'password.number': 'passwordNumber',
      'password.upper': 'passwordUpper',
      'password.lower': 'passwordLower',
      'password.special': 'passwordSpecial',
    }),
});

export const forgotPasswordSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.base': 'emailNotValid',
      'string.empty': 'emailNotValid',
      'string.email': 'emailNotValid',
    }),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string()
    .min(8)
    .custom(passwordMethod, 'password')
    .required()
    .messages({
      'string.base': 'passwordEmpty',
      'string.empty': 'passwordEmpty',
      'string.min': 'passwordShort',
      'password.number': 'passwordNumber',
      'password.upper': 'passwordUpper',
      'password.lower': 'passwordLower',
      'password.special': 'passwordSpecial',
    }),
  passwordRepeat: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'passwordMismatch',
  }),
});

export const registerSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.base': 'emailNotValid',
      'string.empty': 'emailNotValid',
      'string.email': 'emailNotValid',
      'email.domain': 'enter-company-email',
    }),
  password: Joi.string()
    .min(8)
    .custom(passwordMethod, 'password')
    .required()
    .messages({
      'string.base': 'passwordEmpty',
      'string.empty': 'passwordEmpty',
      'string.min': 'passwordShort',
      'password.number': 'passwordNumber',
      'password.upper': 'passwordUpper',
      'password.lower': 'passwordLower',
      'password.special': 'passwordSpecial',
      'any.only': 'passwordMismatch',
    }),
  passwordRepeat: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'passwordMismatch',
  }),
});
