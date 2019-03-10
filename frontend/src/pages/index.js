import React from 'react';
import { View } from 'react-native';
import { NativeRouter, Route, Link, Switch } from 'react-router-native';

import Signup from './Signup';
import Login from './Login';
import Lists from './Lists';
import CheckToken from './CheckToken';

const AppRouter = () => (
  <NativeRouter>
    <Switch>
      <Route exact path="/" component={CheckToken} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/lists" component={Lists} />
    </Switch>
  </NativeRouter>
);

export default AppRouter;
