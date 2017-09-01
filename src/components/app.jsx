import React from 'react';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import SearchIndex from '../containers/search_index';


export default () => (
  <MuiThemeProvider>
    <div>
      <header>Header</header>
      <section id="content">
        <SearchIndex />
      </section>
    </div>
  </MuiThemeProvider>
);
