import { h } from 'preact';
import { useEffect } from 'preact/hooks';

import withRouter, { toRoot } from 'utilities/router';
import { withState } from 'state/game';

const withRequireGame = WrappedComponent => {
  const WrapperComponent = props => {
    const {
      routeGameId,
      stateGameId,
      routes: [toRoot]
    } = props;

    useEffect(() => {
      if (routeGameId && routeGameId !== stateGameId) {
        toRoot();
      }
    }, [props.gameId, props.stateGameId]);

    return <WrappedComponent {...props} />;
  };

  const withGameIdState = withState('gameId', 'stateGameId');
  const withRoutes = withRouter(toRoot);

  return withGameIdState(withRoutes(WrapperComponent));
};

export default withRequireGame;
