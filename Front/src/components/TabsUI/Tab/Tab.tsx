import React, { FC } from 'react';

export interface TabProps {
  name?: string;
  value: string;
  children: JSX.Element;
}

export const Tab: FC<TabProps> = ({ children, name = 'ui-tab' }) => {
  return (
    <div className='ui-tab' data-testid={name}>
      {children}
    </div>
  );
};
