import httpStatus from 'http-status';
import errors from '../constants/errors';
import BaseError from './BaseError';

export default class MethodNotAllowed extends BaseError {
  constructor(message: string) {
    super(
      errors.method_not_allowed,
      httpStatus.METHOD_NOT_ALLOWED,
      message || httpStatus['405_MESSAGE'],
    );
  }
}
