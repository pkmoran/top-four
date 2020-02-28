import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { route } from 'preact-router';

import { withState } from 'state/game';

const withRequireGame = WrappedComponent => {
  const WrapperComponent = props => {
    const { gameId, gameUid } = props;

    useEffect(() => {
      if (!gameId || !gameUid) {
        route('/', true);
      }
    }, [gameId, gameUid]);

    return <WrappedComponent {...props} />;
  };

  const withGameIdState = withState('gameId');
  const withGameUidState = withState('gameUid');

  return withGameIdState(withGameUidState(WrapperComponent));
};

export default withRequireGame;
