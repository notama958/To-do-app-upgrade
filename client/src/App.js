import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// react redux
import React, { Fragment, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Home from './components/Home'; // Home page
import MyRoutes from './components/main/MyRoutes'; // other routes
// loading CSS
import './css/app.css';
import './css/index.css';
import './css/dashboard.css';
import './css/form.css';
import './css/kanban.css';
import './css/mobile-version.css';
// actions
import setAuthToken from './actions/set_token';
import { loadUser } from './actions/auth';

// checking token if user login already
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route component={MyRoutes} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
