import httpStatus from 'http-status';
import errors from '../constants/errors';
import BaseError from './BaseError';

export default class Throttled extends BaseError {
  constructor(message: string) {
    super(
      errors.throttled,
      httpStatus.TOO_MANY_REQUESTS,
      message || httpStatus['429_MESSAGE'],
    );
  }
}
