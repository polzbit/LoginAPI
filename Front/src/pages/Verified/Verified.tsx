import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { validateEmailAPI } from '../../api/usersAPI';
import { Button } from '../../components/Button';

export const Verified = () => {
  const { token } = useParams();
  const [userInfo, setUserInfo] = useState({ email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const validate = async () => {
      if (!token) {
        navigate('/');
        return;
      }
      const data = await validateEmailAPI(token);
      if (!data) {
        navigate('/');
        return;
      }
      const { email } = data;
      setUserInfo({ ...userInfo, email });
    };
    validate();
  }, []);

  return (
    <div className='verified page gradient-anim' data-testid='verified'>
      <div className='verified-success'>
        <h1>{userInfo.email} verified successfully!</h1>
        <Button
          name='login-button'
          variant='text'
          onClick={() => navigate('/')}
        >
          <span>LOGIN</span>
        </Button>
      </div>
    </div>
  );
};
