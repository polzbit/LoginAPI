import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ResetPassword } from '.';
import * as mockHttp from '../../utils/http/http';

let mockToken = 'token';
const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
  useParams: () => ({
    token: mockToken,
  }),
}));

describe('Tests for Reset Password page', () => {
  test.each([
    [{ email: 'test@test.com' }, ''],
    [null, 'token'],
  ])(
    'Reset Password page should redirect if token not valid',
    async (user, token) => {
      mockToken = token;
      mockHttp.patch = jest.fn().mockImplementation(() => {
        return {
          status: 200,
          json: () =>
            Promise.resolve({ data: { error: { message: 'error' } } }),
        };
      });
      mockHttp.get = jest.fn().mockImplementation(() => {
        return {
          status: 200,
          json: () => Promise.resolve({ data: user }),
        };
      });
      render(
        <Router>
          <ResetPassword />
        </Router>,
      );
      const resetButton = screen.getByTestId('reset-button');
      fireEvent.click(resetButton);
      await waitFor(() => expect(mockUseNavigate).toBeCalledWith('/'));
    },
  );

  test('Reset Password page should mount', () => {
    mockToken = 'token';
    mockHttp.get = jest.fn().mockImplementation(() => {
      return {
        status: 200,
        json: () => Promise.resolve({ data: { email: 'test@test.com' } }),
      };
    });
    render(
      <Router>
        <ResetPassword />
      </Router>,
    );
    const resetPassword = screen.getByTestId('reset-password');
    expect(resetPassword).toBeInTheDocument();
  });

  test.each([
    ['test', 'passwordShort'],
    ['Aa1234567!', ''],
  ])('Reset Password page should handle reset error', (password, expected) => {
    mockToken = 'token';
    mockHttp.get = jest.fn().mockImplementation(() => {
      return {
        status: 200,
        json: () => Promise.resolve({ data: { email: 'test@test.com' } }),
      };
    });
    mockHttp.patch = jest.fn().mockImplementation(() => {
      return {
        status: 200,
        json: () => Promise.resolve({ data: { error: { message: 'error' } } }),
      };
    });
    render(
      <Router>
        <ResetPassword />
      </Router>,
    );
    const passwordInput = screen.getByTestId('password').querySelector('input');
    fireEvent.change(passwordInput, {
      target: { value: password },
    });
    const passwordRepeatInput = screen
      .getByTestId('passwordRepeat')
      .querySelector('input');
    fireEvent.change(passwordRepeatInput, {
      target: { value: password },
    });
    const resetButton = screen.getByTestId('reset-button');
    fireEvent.click(resetButton);
    const error = screen.getByTestId('error');
    expect(error).toHaveTextContent(expected);
  });

  test('Reset Password page should handle reset success', async () => {
    mockToken = 'token';
    mockHttp.get = jest.fn().mockImplementation(() => {
      return {
        status: 200,
        json: () => Promise.resolve({ data: { email: 'test@test.com' } }),
      };
    });
    mockHttp.patch = jest.fn().mockImplementation(() => {
      return {
        status: 200,
        json: () => Promise.resolve({ data: null }),
      };
    });
    render(
      <Router>
        <ResetPassword />
      </Router>,
    );
    const passwordInput = screen.getByTestId('password').querySelector('input');
    fireEvent.change(passwordInput, {
      target: { value: 'Aa1234567!' },
    });
    const passwordRepeatInput = screen
      .getByTestId('passwordRepeat')
      .querySelector('input');
    fireEvent.change(passwordRepeatInput, {
      target: { value: 'Aa1234567!' },
    });
    const resetButton = screen.getByTestId('reset-button');
    fireEvent.click(resetButton);
    const success = await screen.findByTestId('success');
    expect(success).toBeInTheDocument();
    const loginButton = screen.getByTestId('reset-button');
    fireEvent.click(loginButton);
    await waitFor(() => expect(mockUseNavigate).toBeCalledWith('/'));
  });
});
