import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Password } from 'phosphor-react';
import { resetPasswordAPI, validateTokenAPI } from '../../api/usersAPI';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';
import errorMessages from '../../utils/constants/errors';
import { resetPasswordSchema } from '../../utils/validation';

export const ResetPassword = () => {
  const [state, setState] = useState({
    requested: false,
    error: '',
    password: '',
    passwordRepeat: '',
  });
  const { token } = useParams();
  const [userInfo, setUserInfo] = useState({ email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const validate = async () => {
      if (!token) {
        navigate('/');
        return;
      }
      const data = await validateTokenAPI(token);
      if (!data) {
        navigate('/');
        return;
      }
      const { email } = data;
      setUserInfo({ ...userInfo, email });
    };
    validate();
  }, []);

  const handleChange = (
    name: string,
    value: string | undefined | number | readonly string[],
  ) => {
    setState({ ...state, [name]: value, error: '' });
  };
  const handleReset = async () => {
    if (!token) {
      return;
    }
    const { error } = resetPasswordSchema.validate({
      password: state.password,
      passwordRepeat: state.passwordRepeat,
    });
    if (error) {
      const { message } = error;
      setState({
        ...state,
        error: message,
      });
      return;
    }
    const result = await resetPasswordAPI(
      token,
      state.password,
      state.passwordRepeat,
    );
    if (result) {
      setState({ ...state, error: errorMessages.oops });
    }

    setState({ ...state, requested: true });
  };

  const handleLogin = () => {
    setState({ error: '', password: '', passwordRepeat: '', requested: false });
    navigate('/');
  };
  return (
    <div
      className='reset-password page gradient-anim'
      data-testid='reset-password'
    >
      <div className='card'>
        <Password size={120} color='rgb(113, 153, 204)' weight='fill' />{' '}
        <span className='head-text'>
          Reset password for account {userInfo.email}
        </span>
        {!state.requested ? (
          <>
            <TextInput
              name='password'
              type='password'
              value={state.password}
              placeholder='Password'
              handleChange={handleChange}
            />
            <TextInput
              name='passwordRepeat'
              type='password'
              value={state.passwordRepeat}
              placeholder='Repeat Password'
              handleChange={handleChange}
            />
            <span data-testid='error' className='error'>
              {state.error}
            </span>
            <Button name='reset-button' variant='fill' onClick={handleReset}>
              <span>RESET PASSWORD</span>
            </Button>
          </>
        ) : (
          <>
            <span data-testid='success' className='success'>
              Password changed successfully!
            </span>
            <Button name='reset-button' variant='fill' onClick={handleLogin}>
              <span>LOGIN</span>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
