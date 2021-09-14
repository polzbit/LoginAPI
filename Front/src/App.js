import './css/App.css';
import './css/Login.css';
import './css/GardientBgAnim.css';
import './css/Tabs.css';
import MainPage from  './components/pages/MainPage';
import LoginPage from  './components/pages/LoginPage';
import ResetPasswordPage from './components/pages/ResetPasswordPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <Router>
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/reset-password/:token" component={ResetPasswordPage} />
    </Switch>
  </Router>
  );
}

export default App;
