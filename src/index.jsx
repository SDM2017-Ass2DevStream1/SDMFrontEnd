import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import reducers from './reducers';
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
    <div>Test</div>
  </Provider>,
  document.getElementById('app'),
);
