import httpStatus from 'http-status';
import errors from '../constants/errors';
import BaseError from './BaseError';

export default class Unauthorized extends BaseError {
  constructor(message: string) {
    super(
      errors.not_authenticated,
      httpStatus.UNAUTHORIZED,
      message || httpStatus['401_MESSAGE'],
    );
  }
}
