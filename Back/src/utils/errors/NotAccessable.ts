import httpStatus from 'http-status';
import errors from '../constants/errors';
import BaseError from './BaseError';

export default class NotAcceptable extends BaseError {
  constructor(message: string) {
    super(
      errors.not_acceptable,
      httpStatus.NOT_ACCEPTABLE,
      message || httpStatus['406_MESSAGE'],
    );
  }
}
