import cx from 'classnames';
import React, { FC, useState } from 'react';
import { Button } from '../Button';
import { Tab } from './Tab';

export interface TabsProps {
  direction: 'row' | 'column';
  name?: string;
  selected?: string;
  children: JSX.Element[];
}

export const Tabs: FC<TabsProps> = ({ name = 'tabs', direction, children }) => {
  const [tabSelected, setSelected] = useState(children[0].props.value);
  return (
    <div
      className={`ui-tabs ${name}`}
      data-testid={name}
      style={{ flexDirection: direction === 'row' ? 'column' : 'row' }}
    >
      <div
        className='tabs-header'
        style={{ flexDirection: direction === 'row' ? 'row' : 'column' }}
      >
        {React.Children.map(children, (child) => (
          <div
            className={cx('tab-header', {
              'tab-active': child.props.value === tabSelected,
            })}
          >
            <Button
              variant='text'
              name={`tab_${child.props.value}`}
              onClick={() => setSelected(child.props.value)}
            >
              <span>{child.props.value}</span>
            </Button>
          </div>
        ))}
      </div>
      {React.Children.map(children, (child, index) =>
        child.props.value === tabSelected ? (
          <Tab name={`tab_content_${index}`} value={child.props.value}>
            {child.props.children}
          </Tab>
        ) : null,
      )}
    </div>
  );
};
