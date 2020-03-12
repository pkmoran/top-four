import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { Router } from 'preact-router';

import { withAction, withState } from 'state/game';
import { saveState } from 'utilities/local_storage';
import compose from 'utilities/compose';
import resolve from 'utilities/resolve';
import { subscribeToGameUpdates } from 'actions/game';

// Code-splitting is automated for routes
import Home from 'routes/home';
import Join from 'routes/join';
import Create from 'routes/create';
import Share from 'routes/share';
import Teams from 'routes/teams';

const App = () => {
  return (
    <div id="app">
      <Router>
        <Home path="/" />
        <Join path="/join" />
        <Create path="/create" />
        <Share path="/:gameId/share" />
        <Teams path="/:gameId/teams" />
      </Router>
    </div>
  );
};

const withSubscribeAction = withAction(subscribeToGameUpdates, 'subscribe');
const withFullState = withState(null, 'fullState');

const withSubscribeEffect = WrappedComponent => {
  return props => {
    useEffect(() => {
      const uid = resolve('fullState.gameUid', props);

      if (uid) props.subscribe(uid);
    }, []);

    return <WrappedComponent {...props} />;
  };
};

const withLocaStorageEffect = WrappedComponent => {
  return props => {
    const writeStateToLocalStorage = () => {
      saveState(props.fullState);
    };

    useEffect(() => {
      window.addEventListener('pagehide', writeStateToLocalStorage);
      window.addEventListener('beforeunload', writeStateToLocalStorage);

      return () => {
        window.removeEventListener('pagehide', writeStateToLocalStorage);
        window.removeEventListener('beforeunload', writeStateToLocalStorage);
      };
    }, [props.fullState]);

    return <WrappedComponent {...props} />;
  };
};

const wrappers = compose(
  withSubscribeAction,
  withFullState,
  withSubscribeEffect,
  withLocaStorageEffect
);

export { App };
export default wrappers(App);
