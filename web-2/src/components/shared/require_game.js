import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { route } from 'preact-router';

import { withState } from 'state/game';

const withRequireGame = WrappedComponent => {
  const WrapperComponent = props => {
    const { gameId: routeGameId, stateGameId } = props;

    useEffect(() => {
      if (routeGameId && routeGameId !== stateGameId) {
        route('/', true);
      }
    }, [props.gameId, props.stateGameId]);

    return <WrappedComponent {...props} />;
  };

  const withGameIdState = withState('game.id', 'stateGameId');

  return withGameIdState(WrapperComponent);
};

export default withRequireGame;
