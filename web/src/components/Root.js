import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducers from '../reducers';
import { loadState, saveState } from '../services/localStorage';

class Root extends Component {
  store;

  constructor(props) {
    super(props);

    this.saveStoreState = this.saveStoreState.bind(this);
  }

  saveStoreState() {
    saveState(this.store.getState());
  }

  componentWillMount() {
    const { initialState = {} } = this.props;

    let state;

    if (Object.keys(initialState).length > 0 || window.location.pathname === '/') {
      state = initialState;
    } else {
      state = loadState() || {};
    }

    // keep state in localStorage clean
    // remove it whenever at the root path or it was just loaded
    saveState({});

    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
      this.store = createStore(reducers, state, applyMiddleware(thunk));
    } else {
      this.store = createStore(reducers, state, applyMiddleware(thunk, logger));
    }

    window.addEventListener('beforeunload', this.saveStoreState);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.saveStoreState);
  }

  render() {
    return (
      <Provider store={this.store}>
        <BrowserRouter>
          {this.props.children}
        </BrowserRouter>
      </Provider>
    );
  }
}

export default Root;
