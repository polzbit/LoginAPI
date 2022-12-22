import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { validateAPI } from '../../api/usersAPI';

export const Home = () => {
  const [userInfo, setUserInfo] = useState({ email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const validate = async () => {
      const data = await validateAPI();
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
    <div className='home page gradient-anim' data-testid='home'>
      <div className='login-success'>
        <h1>{userInfo.email} Logged successfully!</h1>
      </div>
    </div>
  );
};
