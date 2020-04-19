import { h } from 'preact';

import compose from 'utilities/compose';
import {
  toGameRound,
  toRemainingRounds,
  toPlayersWithScores
} from 'utilities/state_mapping';
import { withState } from '@state';
import { GAME_STATE } from 'utilities/constants';

const Header = ({
  round,
  remainingRounds,
  gameId,
  gameState: { state },
  winnerHeader
}) => {
  return (
    <div class="game-header">
      <div class="game-header__top">
        {state !== GAME_STATE.BETWEEN_ROUNDS && <span>Round {round}</span>}
        {state === GAME_STATE.BETWEEN_ROUNDS && remainingRounds > 1 && (
          <span>{remainingRounds} more rounds</span>
        )}
        {state === GAME_STATE.BETWEEN_ROUNDS && remainingRounds === 1 && (
          <span>Last round</span>
        )}
        <span class="game-header__game-id">{gameId}</span>
      </div>
      <span class="game-header__bottom">{winnerHeader}</span>
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
const withPlayerScoresState = withState(
  'game',
  'playerScores',
  toPlayersWithScores
);
const withPlayerUidState = withState('playerUid');

const withProps = WrappedComponent => {
  return props => {
    const { playerUid, playerScores } = props;

    let winnerHeader;

    if (
      playerScores.length > 1 &&
      playerScores[0].score === playerScores[1].score
    ) {
      winnerHeader = `There's a tie for first!`;
    } else if (playerScores[0].uid === playerUid) {
      winnerHeader = `You're winning!`;
    } else {
      winnerHeader = `${playerScores[0].name} is winning!`;
    }

    return <WrappedComponent {...props} winnerHeader={winnerHeader} />;
  };
};

const wrappers = compose(
  withGameRoundState,
  withRemainingRoundsState,
  withGameIdState,
  withPlayerScoresState,
  withPlayerUidState,
  withProps
);

export { Header };
export default wrappers(Header);
