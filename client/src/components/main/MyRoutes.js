import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from '../layout/NotFound';
import Dashboard from './Dashboard';
import Kanban from './Kanban';
import PrivateRoutes from './PrivateRoutes';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Profile from '../profile/Profile';

// Includes Private and Normal routes
const MyRoutes = () => {
  return (
    <section>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        {/* <Route exact path="/mine" component={profile}/> */}
        <PrivateRoutes exact path="/dashboard" component={Dashboard} />
        <PrivateRoutes exact path="/kanban" component={Kanban} />
        <PrivateRoutes exact path="/profile" component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default MyRoutes;
