import { h } from 'preact';

import compose from 'utilities/compose';
import { toGameRound } from 'utilities/state_mapping';
import { withState } from '@state';

const Header = ({ round, gameId }) => {
  return (
    <div class="game-header">
      <span>Round {round}</span>
      <span class="game-header__game-id">{gameId}</span>
    </div>
  );
};

// state
const withGameRoundState = withState('game.topics', 'round', toGameRound);
const withGameIdState = withState('gameId');

const wrappers = compose(withGameRoundState, withGameIdState);

export { Header };
export default wrappers(Header);
