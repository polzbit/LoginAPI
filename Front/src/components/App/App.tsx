import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, Login, ResetPassword, Verified } from '../../pages';

export const App = () => {
  return (
    <div className='app' data-testid='app'>
      <Router>
        <Routes>
          <Route path={'/'} element={<Login />} />
          <Route path={'/home'} element={<Home />} />
          <Route path={'/reset-password/:token'} element={<ResetPassword />} />
          <Route path={'/verified/:token'} element={<Verified />} />
        </Routes>
      </Router>
    </div>
  );
};
