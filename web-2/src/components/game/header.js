import { h } from 'preact';

import compose from 'utilities/compose';
import {
  toGameRound,
  toTotalRounds,
  toPlayersWithScores
} from 'utilities/state_mapping';
import { withState } from '@state';
import { GAME_STATE } from 'utilities/constants';

const Header = ({
  round,
  totalRounds,
  gameId,
  gameState: { state },
  winnerHeader,
  onClickScores
}) => {
  return (
    <div class="game-header">
      <div class="game-header__top">
        <span>
          Round {round}/{totalRounds}
        </span>
        <span class="game-header__game-id">{gameId}</span>
      </div>
      <span class="game-header__bottom">
        <span>{winnerHeader}</span>
        <a onClick={onClickScores}>SCORES-></a>
      </span>
    </div>
  );
};

// state
const withGameRoundState = withState('game.topics', 'round', toGameRound);
const withTotalRoundsState = withState(
  'game.topics',
  'totalRounds',
  toTotalRounds
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
  withTotalRoundsState,
  withGameIdState,
  withPlayerScoresState,
  withPlayerUidState,
  withProps
);

export { Header };
export default wrappers(Header);
