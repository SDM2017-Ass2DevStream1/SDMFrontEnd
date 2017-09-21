import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider } from 'material-ui/styles';

import { muiTheme } from '../constants/styles';
import { Header, SearchIndex } from '../containers';


const App = () => (
  <BrowserRouter>
    <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <Header />
        <section id="content">
          <Switch>
            <Route exact path="/" component={SearchIndex} />
            <Route exact path="/search/:query" component={SearchIndex} />
          </Switch>
        </section>
      </div>
    </MuiThemeProvider>
  </BrowserRouter>
);

export default App;
