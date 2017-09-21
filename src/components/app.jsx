import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { MuiThemeProvider } from 'material-ui/styles';

import { muiTheme } from '../constants/styles';
import { Header, SearchIndex } from '../containers';


const App = () => (
  <BrowserRouter>
    <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <Header />
        <section id="content">
          <Route exact path="/" component={SearchIndex} />
          <Route path="/search/:query" component={SearchIndex} />
        </section>
      </div>
    </MuiThemeProvider>
  </BrowserRouter>
);

export default App;
