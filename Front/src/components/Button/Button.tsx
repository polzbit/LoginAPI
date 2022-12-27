import React, { FC } from 'react';
import { Directions, Variants } from '../../utils/constants/types';
import { Tooltip } from '../Tooltip';

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant: Variants;
  name?: string;
  tooltip?: string;
  tooltipDirection?: Directions;
}

export const Button: FC<ButtonProps> = ({
  variant,
  name = 'button',
  tooltip = '',
  tooltipDirection = Directions.Bottom,
  ...props
}) => {
  const { children } = props;

  return (
    <div className={`ui-button button-${variant} ${name}`}>
      <Tooltip text={tooltip} direction={tooltipDirection}>
        <button data-testid={name} type='button' role='button' {...props}>
          {children}
        </button>
      </Tooltip>
    </div>
  );
};
