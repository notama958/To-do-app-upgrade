import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// react redux
import { Provider } from 'react-redux';
import store from './store';
import Home from './components/Home'; // Home page
import Routes from './components/main/Routes'; // other routes
// loading CSS
import './css/app.css';
import './css/index.css';
import './css/dashboard.css';
import './css/form.css';
import './css/kanban.css';
import './css/mobile-version.css';
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route component={Routes} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;