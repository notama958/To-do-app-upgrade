import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from '../layout/NotFound';
// import Alert from '../layout/Alert';
import Dashboard from './Dashboard';
import Kanban from './Kanban';
const Routes = () => {
  return (
    <section>
      {/* <Alert /> */}
      <Switch>
        {/* <Navbar /> */}
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/kanban" component={Kanban} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
