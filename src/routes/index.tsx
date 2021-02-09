import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from '~/views/home';
import Restaurant from '~/views/restaurant';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/:id" component={Restaurant} />
      <Redirect to="/" />
    </Switch>
  );
};

export default Routes;
