import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { App } from '.';

test('Render base app', () => {
  render(<App />);
  const app = screen.getByTestId('app');
  expect(app).toBeInTheDocument();
});
