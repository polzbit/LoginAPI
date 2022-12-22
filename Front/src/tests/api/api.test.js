import '@testing-library/jest-dom';
import {
  forgotPasswordAPI,
  loginAPI,
  registerAPI,
  resetPasswordAPI,
  validateAPI,
  validateEmailAPI,
  validateTokenAPI,
} from '../../api/usersAPI';
import * as mockHttp from '../../utils/http/http';

const mockToken = 'token';
describe('Running Test for api', () => {
  test.each([
    [200, 'result'],
    [400, undefined],
  ])('api should validate email', async (status, expected) => {
    mockHttp.patch = jest.fn().mockImplementation(() => {
      return {
        status,
        json: () => Promise.resolve({ data: 'result' }),
      };
    });
    const result = await validateEmailAPI(mockToken);
    expect(result).toBe(expected);
  });

  test.each([
    [200, 'result'],
    [400, undefined],
  ])('api should validate token', async (status, expected) => {
    mockHttp.get = jest.fn().mockImplementation(() => {
      return {
        status,
        json: () => Promise.resolve({ data: 'result' }),
      };
    });
    const result = await validateTokenAPI(mockToken);
    expect(result).toBe(expected);
  });

  test.each([
    [200, 'result'],
    [400, undefined],
  ])('api should validate user', async (status, expected) => {
    mockHttp.get = jest.fn().mockImplementation(() => {
      return {
        status,
        json: () => Promise.resolve({ data: 'result' }),
      };
    });
    const result = await validateAPI(mockToken);
    expect(result).toBe(expected);
  });

  test.each([
    [200, 'result'],
    [400, undefined],
  ])('api should send forgot password link', async (status, expected) => {
    mockHttp.post = jest.fn().mockImplementation(() => {
      return {
        status,
        json: () => Promise.resolve({ data: 'result' }),
      };
    });
    const result = await forgotPasswordAPI(mockToken);
    expect(result).toBe(expected);
  });

  test.each([
    [200, 'result'],
    [400, undefined],
  ])('api should reset password', async (status, expected) => {
    mockHttp.patch = jest.fn().mockImplementation(() => {
      return {
        status,
        json: () => Promise.resolve({ data: 'result' }),
      };
    });
    const result = await resetPasswordAPI(mockToken);
    expect(result).toBe(expected);
  });

  test.each([
    [200, 'result'],
    [400, undefined],
  ])('api should login user', async (status, expected) => {
    mockHttp.post = jest.fn().mockImplementation(() => {
      return {
        status,
        json: () => Promise.resolve({ data: 'result' }),
      };
    });
    const result = await loginAPI(mockToken);
    expect(result).toBe(expected);
  });

  test.each([
    [200, 'result'],
    [400, undefined],
  ])('api should register user', async (status, expected) => {
    mockHttp.post = jest.fn().mockImplementation(() => {
      return {
        status,
        json: () => Promise.resolve({ status_code: 'result' }),
      };
    });
    const result = await registerAPI(mockToken);
    expect(result).toBe(expected);
  });
});
