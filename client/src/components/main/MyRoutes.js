import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from '../layout/NotFound';
import Dashboard from './Dashboard';
import Kanban from './Kanban';
import PrivateRoutes from './PrivateRoutes';
import Register from '../auth/Register';
import Login from '../auth/Login';
// Navigation for user endpoints
const MyRoutes = () => {
  return (
    <section>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        {/* <Route exact path="/mine" component={profile}/> */}
        <PrivateRoutes exact path="/dashboard" component={Dashboard} />
        <PrivateRoutes exact path="/kanban" component={Kanban} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default MyRoutes;
