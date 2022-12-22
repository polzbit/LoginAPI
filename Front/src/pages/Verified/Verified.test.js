import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Verified } from '.';
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

describe('Tests for Verified page', () => {
  test.each(['', 'token'])(
    'Verified page should redirect to login page',
    async (token) => {
      mockToken = token;
      mockHttp.patch = jest.fn().mockImplementation(() => {
        return {
          status: 200,
          json: () => Promise.resolve({ data: null }),
        };
      });
      render(
        <Router>
          <Verified />
        </Router>,
      );
      await waitFor(() => expect(mockUseNavigate).toBeCalledWith('/'));
    },
  );

  test('Verified page should mount', () => {
    mockToken = 'token';
    mockHttp.patch = jest.fn().mockImplementation(() => {
      return {
        status: 200,
        json: () => Promise.resolve({ data: { email: 'test@test.com' } }),
      };
    });
    render(
      <Router>
        <Verified />
      </Router>,
    );
    const verified = screen.getByTestId('verified');
    const loginButton = screen.getByTestId('login-button');
    expect(verified).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    fireEvent.click(loginButton);
    expect(mockUseNavigate).toBeCalledWith('/');
  });
});
