import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import SearchIndex from '../containers/search_index';


export default () => (
  <BrowserRouter>
    <MuiThemeProvider>
      <div>
        <header>Header</header>
        <section id="content">
          <Switch>
            <Route exact path="/" component={SearchIndex} />
          </Switch>
        </section>
      </div>
    </MuiThemeProvider>
  </BrowserRouter>
);
