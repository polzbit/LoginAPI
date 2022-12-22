import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Tab } from '.';

describe('Running Test for UI Tab', () => {
  test('Tab should mount', () => {
    render(<Tab value='tab 1'>test</Tab>);
    expect(screen.getByTestId('ui-tab')).toBeInTheDocument();
  });
});
