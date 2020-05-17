import { h } from 'preact';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';

import compose from 'utilities/compose';
import {
  toGameRound,
  toRankingPlayer,
  toTotalRounds
} from 'utilities/state_mapping';
import { withState } from '@state';

import { headerState } from 'components/game/game_state_helpers';

const Header = ({
  header,
  subheader,
  round,
  totalRounds,
  gameId,
  onClickScores
}) => {
  return (
    <div class="game-header">
      <div class="game-header__top-bar">
        <span>
          <span class="game-header__game-id">{gameId}</span>{' '}
          <span class="game-header__rounds">
            &bull; Round {round} of {totalRounds}
          </span>
        </span>

        <MenuOpenIcon color="primary" onClick={onClickScores} />
      </div>
      <div class="game-header__headers">
        <h1>{header}</h1>
        <span>{subheader}</span>
      </div>
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
const withRankingPlayerState = withState(
  'game',
  'rankingPlayer',
  toRankingPlayer
);

const withProps = WrappedComponent => {
  return props => {
    const { header, subheader } = headerState(props);

    return (
      <WrappedComponent {...props} header={header} subheader={subheader} />
    );
  };
};

const wrappers = compose(
  withGameRoundState,
  withTotalRoundsState,
  withGameIdState,
  withRankingPlayerState,
  withProps
);

export { Header };
export default wrappers(Header);
