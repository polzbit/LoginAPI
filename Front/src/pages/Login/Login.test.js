import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import httpStatus from 'http-status';
import { BrowserRouter as Router } from 'react-router-dom';
import { Login } from '.';
import * as mockHttp from '../../utils/http/http';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Tests for Login page', () => {
  test('Login page should mount', () => {
    render(
      <Router>
        <Login />
      </Router>,
    );
    const login = screen.getByTestId('login');
    expect(login).toBeInTheDocument();
  });

  test('Login inputs should handle change', () => {
    render(
      <Router>
        <Login />
      </Router>,
    );
    const input = screen.getByTestId('email').querySelector('input');
    fireEvent.change(input, {
      target: { value: 'test' },
    });
    expect(input).toHaveValue('test');
  });

  test('Login should switch to register tab & register inputs should change', () => {
    render(
      <Router>
        <Login />
      </Router>,
    );
    const registerTab = screen.getByTestId('tab_register');
    fireEvent.click(registerTab);
    const input = screen.getByTestId('email').querySelector('input');
    fireEvent.change(input, {
      target: { value: 'test' },
    });
    expect(input).toHaveValue('test');
  });

  test.each([
    [{ email: 'test', password: 'test', data: null }, 'Email not valid'],
    [{ email: 'test@test.com', password: 'Aa1234567!', data: null }, ''],
    [
      {
        email: 'test@test.com',
        password: 'Aa1234567!',
        data: { error: 'error' },
      },
      '',
    ],
  ])('Login should handle user sign in', (user, expected) => {
    mockHttp.post = jest.fn().mockImplementation(() => {
      return {
        status: 200,
        json: () => Promise.resolve({ data: user.data }),
      };
    });
    render(
      <Router>
        <Login />
      </Router>,
    );
    const emailInput = screen.getByTestId('email').querySelector('input');
    fireEvent.change(emailInput, {
      target: { value: user.email },
    });
    const passwordInput = screen.getByTestId('password').querySelector('input');
    fireEvent.change(passwordInput, {
      target: { value: user.password },
    });
    expect(emailInput).toHaveValue(user.email);
    expect(passwordInput).toHaveValue(user.password);
    const loginButton = screen.getByTestId('login-button');
    fireEvent.click(loginButton);
    const error = screen.getByTestId('error');
    expect(error).toHaveTextContent(expected);
  });

  test.each([
    [{ email: 'test', password: 'test' }, 'Email not valid'],
    [
      {
        email: 'test@test.com',
        password: 'Aa1234567!',
      },
      '',
    ],
  ])('Register should handle new user register', async (user, expected) => {
    mockHttp.post = jest.fn().mockImplementation(() => {
      return {
        status: 200,
        json: () => Promise.resolve({ data: null }),
      };
    });
    render(
      <Router>
        <Login />
      </Router>,
    );
    const registerTab = screen.getByTestId('tab_register');
    fireEvent.click(registerTab);
    const emailInput = screen.getByTestId('email').querySelector('input');
    fireEvent.change(emailInput, {
      target: { value: user.email },
    });
    const passwordInput = screen.getByTestId('password').querySelector('input');
    fireEvent.change(passwordInput, {
      target: { value: user.password },
    });
    const passwordRepeatInput = screen
      .getByTestId('passwordRepeat')
      .querySelector('input');
    fireEvent.change(passwordRepeatInput, {
      target: { value: user.password },
    });
    expect(emailInput).toHaveValue(user.email);
    expect(passwordInput).toHaveValue(user.password);
    expect(passwordRepeatInput).toHaveValue(user.password);
    const registerButton = screen.getByTestId('login-button');
    fireEvent.click(registerButton);
    const error = screen.getByTestId('error');
    await waitFor(() => expect(error).toHaveTextContent(expected));
  });

  test('Register should handle new user register and show message', async () => {
    mockHttp.post = jest.fn().mockImplementation(() => {
      return {
        status: httpStatus.CREATED,
        json: () => Promise.resolve({ status_code: httpStatus.CREATED }),
      };
    });
    render(
      <Router>
        <Login />
      </Router>,
    );
    expect(screen.queryByTestId('register-message')).not.toBeInTheDocument();
    const registerTab = screen.getByTestId('tab_register');
    fireEvent.click(registerTab);
    const emailInput = screen.getByTestId('email').querySelector('input');
    fireEvent.change(emailInput, {
      target: { value: 'test@test.com' },
    });
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
    expect(emailInput).toHaveValue('test@test.com');
    expect(passwordInput).toHaveValue('Aa1234567!');
    expect(passwordRepeatInput).toHaveValue('Aa1234567!');
    const registerButton = screen.getByTestId('login-button');
    fireEvent.click(registerButton);
    await waitFor(() =>
      expect(screen.getByTestId('register-message')).toBeInTheDocument(),
    );
  });

  test('Login should handle forgot password', async () => {
    mockHttp.post = jest.fn().mockImplementation(() => {
      return {
        status: httpStatus.CREATED,
        json: () =>
          Promise.resolve({ data: { error: { message: 'emailNotValid' } } }),
      };
    });
    render(
      <Router>
        <Login />
      </Router>,
    );
    const input = screen.getByTestId('email').querySelector('input');
    fireEvent.change(input, {
      target: { value: 'test@test.com' },
    });
    const forgotButton = screen.getByTestId('forgot-button');
    fireEvent.click(forgotButton);
    const error = screen.getByTestId('error');
    await waitFor(() => expect(error).toHaveClass('sent'));
  });

  test('Login should handle forgot password', async () => {
    mockHttp.post = jest.fn().mockImplementation(() => {
      return {
        status: httpStatus.CREATED,
        json: () =>
          Promise.resolve({ data: { error: { message: 'emailNotValid' } } }),
      };
    });
    render(
      <Router>
        <Login />
      </Router>,
    );
    const input = screen.getByTestId('email').querySelector('input');
    fireEvent.change(input, {
      target: { value: 'test' },
    });
    const forgotButton = screen.getByTestId('forgot-button');
    fireEvent.click(forgotButton);
    const error = screen.getByTestId('error');
    await waitFor(() => expect(error).toHaveTextContent('Email not valid'));
  });
});
