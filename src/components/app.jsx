import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { lightGreen500, lightGreen700 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from '../containers/header';
import SearchIndex from '../containers/search_index';


// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: lightGreen500,
    primary2Color: lightGreen700,
  },
});

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
