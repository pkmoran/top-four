import { h } from 'preact';

import compose from 'utilities/compose';
import { toGameRound, toRemainingRounds } from 'utilities/state_mapping';
import { withState } from '@state';
import { GAME_STATE } from 'utilities/constants';

const Header = ({ round, remainingRounds, gameId, gameState: { state } }) => {
  return (
    <div class="game-header">
      {state !== GAME_STATE.BETWEEN_ROUNDS && <span>Round {round}</span>}
      {state === GAME_STATE.BETWEEN_ROUNDS && remainingRounds > 1 && (
        <span>{remainingRounds} more rounds</span>
      )}
      {state === GAME_STATE.BETWEEN_ROUNDS && remainingRounds === 1 && (
        <span>Last round</span>
      )}
      <span class="game-header__game-id">{gameId}</span>
    </div>
  );
};

// state
const withGameRoundState = withState('game.topics', 'round', toGameRound);
const withRemainingRoundsState = withState(
  'game.topics',
  'remainingRounds',
  toRemainingRounds
);
const withGameIdState = withState('gameId');

const wrappers = compose(
  withGameRoundState,
  withRemainingRoundsState,
  withGameIdState
);

export { Header };
export default wrappers(Header);
