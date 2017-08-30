import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';

import reducers from './reducers';
import SearchIndex from './containers/search_index';
import './styles/index.css';


const logger = createLogger({
  level: 'info',
});

const middlewares = __DEV__
  ? applyMiddleware(thunk, logger)
  : applyMiddleware(thunk);


const store = middlewares(createStore)(reducers);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <header>Header</header>
      <section>
        <SearchIndex />
      </section>
    </div>
  </Provider>,
  document.getElementById('app'),
);
