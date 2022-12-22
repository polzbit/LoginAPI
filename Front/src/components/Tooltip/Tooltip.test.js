import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Tooltip } from './';

describe('Running Test for UI Tooltip', () => {
  test('Tooltip should mount', () => {
    render(
      <Tooltip direction='right' text='test text'>
        <span>test</span>
      </Tooltip>,
    );
    expect(screen.getByTestId('tooltip')).toBeInTheDocument();
  });

  test('Tooltip should not be visible', () => {
    render(
      <Tooltip direction='right' text='test text'>
        <span>test</span>
      </Tooltip>,
    );
    expect(screen.getByRole('tooltip')).toHaveStyle('opacity: 0');
  });

  test('Tooltip should be visible', () => {
    render(
      <Tooltip direction='right' text='test text'>
        <span>test</span>
      </Tooltip>,
    );
    const tooltip = screen.getByTestId('tooltip');
    expect(screen.getByRole('tooltip')).toHaveStyle('opacity: 0');
    fireEvent.mouseOver(tooltip);
    expect(screen.getByRole('tooltip')).toHaveStyle('opacity: 1');
    fireEvent.mouseOut(tooltip);
    expect(screen.getByRole('tooltip')).toHaveStyle('opacity: 0');
  });
});
