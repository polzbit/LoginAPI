import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Tabs } from '.';
import { Tab } from './Tab/Tab';

describe('Running Test for UI Tabs', () => {
  test.each(['row', 'column'])('Tabs should mount', (direction) => {
    render(
      <Tabs direction={direction}>
        <Tab value='1'>test</Tab>
        <Tab value='2'>test</Tab>
      </Tabs>,
    );
    expect(screen.getByTestId('tabs')).toBeInTheDocument();
  });
  test('Tabs should show selected', () => {
    render(
      <Tabs direction='row'>
        <Tab value='0'>test</Tab>
        <Tab value='1'>test</Tab>
      </Tabs>,
    );
    expect(screen.getByTestId('tab_content_0')).toBeInTheDocument();
    expect(screen.queryByTestId('tab_content_1')).not.toBeInTheDocument();
    const tab = screen.getByTestId('tab_1');
    expect(tab).toBeInTheDocument();
    fireEvent.click(tab);
    expect(screen.queryByTestId('tab_content_0')).not.toBeInTheDocument();
    expect(screen.getByTestId('tab_content_1')).toBeInTheDocument();
  });
});
