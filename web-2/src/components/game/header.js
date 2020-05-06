import { h } from 'preact';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';

import compose from 'utilities/compose';
import { toGameRound, toTotalRounds } from 'utilities/state_mapping';
import { withState } from '@state';

const Header = ({ round, totalRounds, gameId, onClickScores }) => {
  return (
    <div class="game-header">
      <span>
        <span class="game-header__game-id">{gameId}</span>{' '}
        <span class="game-header__rounds">
          &bull; Round {round} of {totalRounds}
        </span>
      </span>

      <MenuOpenIcon color="primary" onClick={onClickScores} />
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

const wrappers = compose(
  withGameRoundState,
  withTotalRoundsState,
  withGameIdState
);

export { Header };
export default wrappers(Header);
