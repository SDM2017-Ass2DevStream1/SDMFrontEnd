import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider } from 'material-ui/styles';

import { muiTheme } from '../constants/styles';
import Header from '../containers/header';
import SearchIndex from '../containers/search_index';


const App = () => (
  <BrowserRouter>
    <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <Header />
        <section id="content">
          <Switch>
            <Route exact path="/" component={SearchIndex} />
          </Switch>
        </section>
      </div>
    </MuiThemeProvider>
  </BrowserRouter>
);

export default App;
