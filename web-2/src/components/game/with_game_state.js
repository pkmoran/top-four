import { h } from 'preact';

import { withState } from '@state';
import { toPlayer } from 'utilities/state_mapping';
import compose from 'utilities/compose';
import { GAME_STATE } from 'utilities/constants';

const getGameState = ({
  remoteGameState,
  player: { uid, lockedIn },
  rankingPlayerUid
}) => {
  const ranking = uid === rankingPlayerUid;

  if (!remoteGameState) return { state: GAME_STATE.BETWEEN_ROUNDS };

  if (remoteGameState === 'ranking' && !lockedIn)
    return { state: GAME_STATE.RANKING, ranking };

  if (remoteGameState === 'ranking' && lockedIn)
    return { state: GAME_STATE.LOCKED_IN, ranking };
};

const withGameState = WrappedComponent => {
  const Component = props => {
    return <WrappedComponent {...props} gameState={getGameState(props)} />;
  };

  const withRemoteGameState = withState('game.state', 'remoteGameState');
  const withPlayerState = withState(null, 'player', toPlayer);
  const withRankingPlayerUidState = withState(
    'game.rankingPlayerUid',
    'rankingPlayerUid'
  );

  const wrappers = compose(
    withRemoteGameState,
    withPlayerState,
    withRankingPlayerUidState
  );

  return wrappers(Component);
};

export { getGameState, withGameState };
export default withGameState;
