import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Home } from '.';
import * as mockHttp from '../../utils/http/http';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Tests for Home page', () => {
  test('Home page should mount', () => {
    mockHttp.get = jest.fn().mockImplementation(() => {
      return {
        status: 200,
        json: () => Promise.resolve({ data: { email: 'test@test.com' } }),
      };
    });
    render(
      <Router>
        <Home />
      </Router>,
    );
    const home = screen.getByTestId('home');
    expect(home).toBeInTheDocument();
  });

  test('Home page should redirect to login page', () => {
    mockHttp.get = jest.fn().mockImplementation(() => {
      return {
        status: 200,
        json: () => Promise.resolve({}),
      };
    });
    render(
      <Router>
        <Home />
      </Router>,
    );
    const home = screen.getByTestId('home');
    expect(home).toBeInTheDocument();
  });
});
