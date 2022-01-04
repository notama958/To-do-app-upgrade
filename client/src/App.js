import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// react redux
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Home from './components/Home'; // Home page
import MyRoutes from './components/main/MyRoutes'; // other routes

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
