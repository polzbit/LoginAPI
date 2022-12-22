import httpStatus from 'http-status';
import errors from '../constants/errors';
import BaseError from './BaseError';

export default class NotFound extends BaseError {
  constructor(message: string) {
    super(
      errors.not_found,
      httpStatus.NOT_FOUND,
      message || httpStatus['404_MESSAGE'],
    );
  }
}
