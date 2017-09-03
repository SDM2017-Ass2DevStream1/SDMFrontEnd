import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';

import reducers from './reducers';
import App from './components/app';
import './styles/global.less';


// ref: https://medium.com/@zalmoxis/improve-your-development-workflow-with-redux-devtools-extension-f0379227ff83
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = createLogger({
  level: 'info',
});

let middlewares = [thunk];

if (__DEV__) {
  middlewares = [...middlewares, logger];
}

const middleware = composeEnhancers(applyMiddleware(...middlewares));
const initialState = window.INITIAL_STATE;
const store = createStore(reducers, initialState, middleware);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
