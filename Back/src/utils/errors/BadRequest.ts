import httpStatus from 'http-status';
import errors from '../constants/errors';
import BaseError from './BaseError';

export default class BadRequest extends BaseError {
  constructor(message: string) {
    super(
      errors.validation,
      httpStatus.BAD_REQUEST,
      message || httpStatus['400_MESSAGE'],
    );
  }
}
