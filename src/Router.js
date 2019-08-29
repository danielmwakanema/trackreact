import React from 'react';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from './layouts/Admin/Admin';
import Login from './views/User/Login';

const hist = createBrowserHistory();

export default () => {
  return (
    <Router history={hist}>
      <Switch>
        <Route path="/admin" render={props => <AdminLayout {...props} />} />
        <Route path="/login" render={props => <Login {...props} /> } />
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  )
}