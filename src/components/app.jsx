import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { getMuiTheme, MuiThemeProvider, colors } from 'material-ui/styles';

import Header from '../containers/header';
import SearchIndex from '../containers/search_index';


// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: colors.lightGreen500,
    primary2Color: colors.lightGreen700,
    pickerHeaderColor: colors.lightGreen500,
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
