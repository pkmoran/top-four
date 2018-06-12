import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import './index.css';
import Root from './components/Root';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Root>
    <Route path="/" component={App} />
  </Root>,
  document.querySelector('#root')
);

registerServiceWorker();
