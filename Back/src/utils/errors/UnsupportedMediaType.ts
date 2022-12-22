import httpStatus from 'http-status';
import errors from '../constants/errors';
import BaseError from './BaseError';

export default class UnsupportedMediaType extends BaseError {
  constructor(message: string) {
    super(
      errors.unsupported_media_type,
      httpStatus.UNSUPPORTED_MEDIA_TYPE,
      message || httpStatus['415_MESSAGE'],
    );
  }
}
