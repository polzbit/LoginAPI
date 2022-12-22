import '@testing-library/jest-dom';
import { passwordMethod } from '../../utils/validation';

describe('Running Test for validations', () => {
  test.each([
    ['', 'password.number'],
    ['test1', 'password.upper'],
    ['TEST1', 'password.lower'],
    ['Test1', 'password.special'],
    ['Test1!', 'Test1!'],
  ])('password method should return error', (password, expected) => {
    const result = passwordMethod(password);
    expect(result).toBe(expected);
  });
});
