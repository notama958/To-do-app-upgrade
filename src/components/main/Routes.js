import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from '../layout/NotFound';
// import Alert from '../layout/Alert';
import Dashboard from './Dashboard';
const Routes = () => {
  return (
    <section>
      {/* <Alert /> */}
      <Switch>
        {/* <Navbar /> */}
        <Route exact path="/dashboard" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
