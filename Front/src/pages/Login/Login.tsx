import { useState } from 'react';
import httpStatus from 'http-status';
import cx from 'classnames';
import { useNavigate } from 'react-router';
import { UsersThree, NotePencil, Checks, Envelope } from 'phosphor-react';
import { Tabs } from '../../components/TabsUI';
import { Tab } from '../../components/TabsUI/Tab';
import { TextInput } from '../../components/TextInput';
import { Button } from '../../components/Button';
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
} from '../../utils/validation';
import { forgotPasswordAPI, loginAPI, registerAPI } from '../../api/usersAPI';
import errorMessages from '../../utils/constants/errors';

export const Login = () => {
  const [errors, setErrors] = useState({
    login: '',
    register: '',
  });
  const [state, setState] = useState({
    registered: false,
    login: {
      email: '',
      password: '',
    },
    register: {
      email: '',
      password: '',
      passwordRepeat: '',
    },
  });

  const navigate = useNavigate();

  const handleLoginChange = (
    name: string,
    value: string | undefined | number | readonly string[],
  ) => {
    setErrors({ login: '', register: '' });
    setState({ ...state, login: { ...state.login, [name]: value } });
  };

  const handleRegisterChange = (
    name: string,
    value: string | undefined | number | readonly string[],
  ) => {
    setErrors({ login: '', register: '' });
    setState({ ...state, register: { ...state.register, [name]: value } });
  };

  const handleLogin = async () => {
    const { error } = loginSchema.validate(state.login);
    if (error) {
      const { message } = error;
      setErrors({
        ...errors,
        login: errorMessages[message as keyof typeof errorMessages],
      });
      return;
    }
    const { login } = state;
    const { email, password } = login;
    const data = await loginAPI(email, password);
    if (data) {
      const { error: loginError } = data;
      setErrors({ ...errors, login: loginError });
      return;
    }
    navigate('/home');
  };

  const handleRegister = async () => {
    const { error } = registerSchema.validate(state.register);
    if (error) {
      const { message } = error;
      setErrors({
        ...errors,
        register: errorMessages[message as keyof typeof errorMessages],
      });
      return;
    }
    const { register } = state;
    const { email, password, passwordRepeat } = register;
    const status = await registerAPI(email, password, passwordRepeat);
    if (status === httpStatus.CREATED) {
      setState({ ...state, registered: true });
    }
  };

  const handleForgotPassword = async () => {
    const { error } = forgotPasswordSchema.validate({
      email: state.login.email,
    });
    if (error) {
      const { message } = error;
      setErrors({
        ...errors,
        login: errorMessages[message as keyof typeof errorMessages],
      });
      return;
    }
    await forgotPasswordAPI(state.login.email);
    setErrors({
      ...errors,
      login: errorMessages.resetSent,
    });
  };

  return (
    <div className='login page gradient-anim' data-testid='login'>
      <div className='card'>
        <Tabs direction='row'>
          <Tab value='login'>
            <div className='content'>
              <UsersThree size={120} weight='fill' color='rgb(113, 153, 204)' />
              <TextInput
                name='email'
                placeholder='Email'
                value={state.login.email}
                handleChange={handleLoginChange}
                icon={<Envelope size={40} color='#dcdcdc ' weight='bold' />}
              />
              <TextInput
                name='password'
                type='password'
                placeholder='Password'
                value={state.login.password}
                handleChange={handleLoginChange}
              />
              <Button
                name='forgot-button'
                variant='text'
                onClick={handleForgotPassword}
              >
                <span>Forgot Password?</span>
              </Button>
              <span
                data-testid='error'
                className={cx({
                  error: errors.login !== errorMessages.resetSent,
                  sent: errors.login === errorMessages.resetSent,
                })}
              >
                {errors.login}
              </span>
              <Button name='login-button' variant='fill' onClick={handleLogin}>
                <span>Login</span>
              </Button>
            </div>
          </Tab>
          <Tab value='register'>
            {!state.registered ? (
              <div className='content'>
                <NotePencil
                  size={120}
                  color='rgb(113, 153, 204)'
                  weight='fill'
                />
                <TextInput
                  name='email'
                  value={state.register.password}
                  placeholder='Email'
                  handleChange={handleRegisterChange}
                  icon={<Envelope size={40} color='#dcdcdc ' weight='bold' />}
                />
                <TextInput
                  name='password'
                  type='password'
                  value={state.register.password}
                  placeholder='Password'
                  handleChange={handleRegisterChange}
                />
                <TextInput
                  name='passwordRepeat'
                  type='password'
                  value={state.register.passwordRepeat}
                  placeholder='Repeat Password'
                  handleChange={handleRegisterChange}
                />
                <span data-testid='error' className='error'>
                  {errors.register}
                </span>
                <Button
                  name='login-button'
                  variant='fill'
                  onClick={handleRegister}
                >
                  <span>Register</span>
                </Button>
              </div>
            ) : (
              <div className='content' data-testid='register-message'>
                <Checks
                  size={120}
                  color='rgba(80, 167, 91, 0.87)'
                  weight='fill'
                />
                <h1 className='register-header'>Registered!</h1>
                <p className='success'>
                  Verification mail has been sent to{' '}
                  <b>{state.register.email}</b>, please check your email and
                  confirm.
                </p>
              </div>
            )}
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};
