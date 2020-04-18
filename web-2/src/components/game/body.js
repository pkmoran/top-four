import { h } from 'preact';

import compose from 'utilities/compose';
import { toRankingPlayer } from 'utilities/state_mapping';
import { withState } from '@state';
import { GAME_STATE } from 'utilities/constants';

import RankableTopics from 'components/game/rankable_topics';
import { bodyState } from 'components/game/game_state_helpers';

const Body = ({ header, subheader, gameState }) => {
  return (
    <div class="game-body">
      <h1>{header}</h1>
      <span>{subheader}</span>

      {[GAME_STATE.RANKING, GAME_STATE.LOCKED_IN].includes(gameState.state) && (
        <RankableTopics gameState={gameState} />
      )}
    </div>
  );
};

// state
const withRankingPlayerState = withState(
  'game',
  'rankingPlayer',
  toRankingPlayer
);

const withProps = WrappedComponent => {
  return props => {
    const { header, subheader } = bodyState(props);

    return (
      <WrappedComponent {...props} header={header} subheader={subheader} />
    );
  };
};

const wrappers = compose(withRankingPlayerState, withProps);

export { Body };
export default wrappers(Body);
