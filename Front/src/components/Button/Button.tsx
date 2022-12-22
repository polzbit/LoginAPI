import React, { FC } from 'react';
import { Tooltip } from '../Tooltip';

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant: 'text' | 'fill' | 'outline';
  name?: string;
  tooltip?: string;
  tooltipDirection?: 'top' | 'left' | 'right' | 'bottom';
}

export const Button: FC<ButtonProps> = ({
  variant,
  name = 'button',
  tooltip = '',
  tooltipDirection = 'bottom',
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
