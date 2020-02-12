import { h, Component } from 'preact';
import { Router } from 'preact-router';

// Code-splitting is automated for routes
import Home from 'routes/home';
import Join from 'routes/join';
import Create from 'routes/create';

export default class App extends Component {
  render() {
    return (
      <div id="app">
        <Router>
          <Home path="/" />
          <Join path="/join" />
          <Create path="/create" />
        </Router>
      </div>
    );
  }
}
