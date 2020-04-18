import { h } from 'preact';

import { withState } from '@state';
import { toPlayer } from 'utilities/state_mapping';
import compose from 'utilities/compose';
import { GAME_STATE } from 'utilities/constants';
import { toUnlockedInPlayers } from 'utilities/state_mapping';

const getGameState = ({
  remoteGameState,
  player: { uid, lockedIn },
  rankingPlayerUid,
  unlockedInPlayers
}) => {
  const ranker = uid === rankingPlayerUid;

  if (!remoteGameState) return { state: GAME_STATE.BETWEEN_ROUNDS };

  if (remoteGameState === 'ranking' && !lockedIn)
    return { state: GAME_STATE.RANKING, ranker };

  if (remoteGameState === 'ranking' && lockedIn)
    return { state: GAME_STATE.LOCKED_IN, ranker, unlockedInPlayers };
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
  const withUnlockedInPlayersState = withState(
    'game.players',
    'unlockedInPlayers',
    toUnlockedInPlayers
  );

  const wrappers = compose(
    withRemoteGameState,
    withPlayerState,
    withRankingPlayerUidState,
    withUnlockedInPlayersState
  );

  return wrappers(Component);
};

export { getGameState, withGameState };
export default withGameState;
