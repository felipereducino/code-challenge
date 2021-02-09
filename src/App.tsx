import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from '~/routes';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
