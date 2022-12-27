import React, { FC, ReactNode, useState } from 'react';
import { Directions } from '../../utils/constants/types';

export interface TooltipProps {
  text: string;
  direction: Directions;
  children: ReactNode;
  name?: string;
}

export const Tooltip: FC<TooltipProps> = ({
  name = 'tooltip',
  direction,
  children,
  text,
}) => {
  const [show, setShow] = useState(false);

  return (
    <div
      className={`ui-tooltip ${name}`}
      data-testid={name}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <div
        className={`tooltip-text dir-${direction}`}
        role='tooltip'
        style={{ opacity: show && !!text ? 1 : 0 }}
      >
        <span>{text}</span>
      </div>
      {children}
    </div>
  );
};
