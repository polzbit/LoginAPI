import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { TextInput } from '.';

describe('Running Test for UI TextInput', () => {
  const mockHandleChange = jest.fn();
  test('TextInput should mount', () => {
    render(<TextInput value='test text' handleChange={mockHandleChange} />);
    expect(screen.getByTestId('textInput')).toBeInTheDocument();
  });

  test('TextInput should handle change', () => {
    render(<TextInput value='test text' />);
    const input = screen.getByTestId('textInput').querySelector('input');
    fireEvent.change(input, {
      target: { value: 'test' },
    });
  });

  test('TextInput should handle change', () => {
    render(<TextInput value='test text' handleChange={mockHandleChange} />);
    const input = screen.getByTestId('textInput').querySelector('input');
    fireEvent.change(input, {
      target: { value: 'test' },
    });
    expect(mockHandleChange).toBeCalled();
  });

  test('TextInput should not show error', () => {
    render(<TextInput value='test text' error='' />);
    const input = screen.getByTestId('textInput').querySelector('input');

    fireEvent.change(input, {
      target: { value: 'test' },
    });
    expect(screen.getByTestId('error-message')).not.toBeVisible();
  });

  test('TextInput should show error', () => {
    render(
      <TextInput
        value='test text'
        error='error'
        handleChange={mockHandleChange}
      />,
    );
    expect(screen.getByTestId('error-message')).toBeVisible();
  });

  test('TextInput should be type password', () => {
    render(
      <TextInput
        value='test text'
        type='password'
        handleChange={mockHandleChange}
      />,
    );
    expect(screen.getByTestId('key-icon')).toBeInTheDocument();

    const passwordButton = screen.getByTestId('password-button');
    expect(passwordButton).toBeInTheDocument();
    fireEvent.click(passwordButton);
    expect(screen.getByTestId('eye-close-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('eye-icon')).not.toBeInTheDocument();
    fireEvent.click(passwordButton);
    expect(screen.getByTestId('eye-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('eye-close-icon')).not.toBeInTheDocument();
  });
});
