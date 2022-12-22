import '@testing-library/jest-dom';
import { TRACKING_ID_HEADER_KEY } from '../../utils/constants/tracking';
import {
  deleteApi,
  get,
  getTrackingHeader,
  isOkStatus,
  patch,
  post,
  put,
} from '../../utils/http/http';

describe('Running Test for http util', () => {
  test('util should generate tracking id', () => {
    const result = getTrackingHeader();
    expect(Object.hasOwn(result, TRACKING_ID_HEADER_KEY)).toBe(true);
  });
  test('util should check status', () => {
    expect(isOkStatus(200)).toBe(true);
  });
  test.each([get, post, patch, put, deleteApi])(
    'util should send GET request',
    (method) => {
      expect(typeof method('')).toBe('object');
    },
  );
});
