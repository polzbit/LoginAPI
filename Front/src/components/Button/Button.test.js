import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from './';

describe('Running Test for UI Button', () => {
  const mockClick = jest.fn();

  test('Button should mount', () => {
    render(<Button>test</Button>);
    expect(screen.getByTestId('button')).toBeInTheDocument();
  });

  test('Button should be disabled', () => {
    render(<Button disabled>test</Button>);
    expect(screen.getByTestId('button')).toBeDisabled();
  });

  test('Button should be clickable', () => {
    render(<Button onClick={mockClick}>test</Button>);
    const button = screen.getByTestId('button');
    expect(button).toBeEnabled();
    fireEvent.click(button);
    expect(mockClick).toBeCalled();
  });
});
