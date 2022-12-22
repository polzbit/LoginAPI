import cx from 'classnames';
import { FC, useState } from 'react';
import { Eye, EyeSlash, Key } from 'phosphor-react';
import { Button } from '../Button';

export interface TextInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name?: string;
  error?: string;
  icon?: JSX.Element;
  handleChange?: (
    name: string,
    value: string | undefined | number | readonly string[],
  ) => void;
}
export const TextInput: FC<TextInputProps> = ({
  name = 'textInput',
  value,
  error,
  icon,
  handleChange,
  ...props
}) => {
  const [type, setType] = useState('password');
  const onChange = (event: any) => {
    if (handleChange) {
      handleChange(name, event.target.value);
    }
  };
  const changeInputType = () => {
    setType(type === 'password' ? 'text' : 'password');
  };

  return (
    <div
      className={cx(`ui-text-input ${name}`, { 'input-error': !!error })}
      data-testid={name}
    >
      <div className='input-wrapper'>
        {props.type === 'password' ? (
          <Key size={40} color='#dcdcdc' weight='bold' data-testid='key-icon' />
        ) : (
          icon
        )}
        <input {...props} type={type} onChange={onChange} />
        {props.type === 'password' && (
          <Button
            variant='text'
            name='password-button'
            onClick={changeInputType}
          >
            {type === 'password' ? (
              <Eye
                size={40}
                color='#dcdcdc '
                weight='bold'
                data-testid='eye-icon'
              />
            ) : (
              <EyeSlash
                size={40}
                color='#dcdcdc'
                weight='bold'
                data-testid='eye-close-icon'
              />
            )}
          </Button>
        )}
      </div>
      <span
        data-testid='error-message'
        className='error-text'
        style={{ opacity: !!error ? 1 : 0 }}
      >
        {error}
      </span>
    </div>
  );
};
