import httpStatus from 'http-status';
import errors from '../constants/errors';
import BaseError from './BaseError';

export default class Forbidden extends BaseError {
  constructor(message: string) {
    super(
      errors.permission_denied,
      httpStatus.FORBIDDEN,
      message || httpStatus['403_MESSAGE'],
    );
  }
}
