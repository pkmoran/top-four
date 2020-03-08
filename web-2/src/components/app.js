import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { Router } from 'preact-router';

import { withState } from 'state/game';
import { saveState } from 'utilities/local_storage';
import compose from 'utilities/compose';

// Code-splitting is automated for routes
import Home from 'routes/home';
import Join from 'routes/join';
import Create from 'routes/create';
import Share from 'routes/share';

const App = () => {
  return (
    <div id="app">
      <Router>
        <Home path="/" />
        <Join path="/join" />
        <Create path="/create" />
        <Share path=":gameId/share" />
      </Router>
    </div>
  );
};

const withStateForLocalStorage = withState(null, 'localStorageState');
const withEffect = WrappedComponent => {
  return props => {
    const writeStateToLocalStorage = () => {
      saveState(props.localStorageState);
    };

    useEffect(() => {
      window.addEventListener('pagehide', writeStateToLocalStorage);
      window.addEventListener('beforeunload', writeStateToLocalStorage);

      return () => {
        window.removeEventListener('pagehide', writeStateToLocalStorage);
        window.removeEventListener('beforeunload', writeStateToLocalStorage);
      };
    }, [props.localStorageState]);

    return <WrappedComponent {...props} />;
  };
};

const wrappers = compose(withStateForLocalStorage, withEffect);

export { App };
export default wrappers(App);
