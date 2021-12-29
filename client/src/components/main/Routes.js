import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from '../layout/NotFound';
import Dashboard from './Dashboard';
import Kanban from './Kanban';
// Navigation for user endpoints
const Routes = () => {
  return (
    <section>
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/kanban" component={Kanban} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
