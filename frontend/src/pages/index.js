import React from 'react';
import { View } from 'react-native';
import { NativeRouter, Route, Link, Switch } from 'react-router-native';

import Signup from './Signup';
import Login from './Login';
import Lists from './Lists';
import CheckToken from './CheckToken';
import NewProduct from './NewProduct';

const AppRouter = () => (
  <NativeRouter>
    <Switch>
      <Route exact path="/" component={CheckToken} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/lists" component={Lists} />
      <Route exact path="/new-product" component={NewProduct} />
    </Switch>
  </NativeRouter>
);

export default AppRouter;
