import React from "react";
import { useSelector } from "react-redux";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "./layouts/Admin/Admin";
import Login from "./views/User/Login";

const hist = createBrowserHistory();
const tokensNotEmpty = tokens =>
  tokens.reduce((acc, val) => acc && val !== null && val !== "", true);

const toLogin = () => {
  return (
    <Router history={hist}>
      <Switch>
        <Route path="/login" render={props => <Login {...props} />} />
        <Redirect from="*" to="/login" />
      </Switch>
    </Router>
  );
};

const passage = () => {
  return (
    <Router history={hist}>
      <Switch>
        <Route path="/admin" render={props => <AdminLayout {...props} />} />
        <Route path="/login" render={props => <Login {...props} />} />
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  );
};

export default () => {
  const tokens = useSelector(state =>
    Object.assign(
      {},
      { email: state.User.email, password: state.User.password }
    )
  );
  const valid = tokensNotEmpty(Object.values(tokens));

  if (valid) return passage();
  return toLogin();
};
