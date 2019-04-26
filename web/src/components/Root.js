import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from '../reducers';

const Root = ({ children, initialState = {} }) => {
  let store;
  if (process.env.REACT_APP_TESTING) {
    store = createStore(reducers, initialState, applyMiddleware(thunk));
  } else {
    store = createStore(reducers, initialState, applyMiddleware(thunk, logger));
  }

  return (
    <Provider store={store}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </Provider>
  );
};

export default Root;
