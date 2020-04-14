import { h } from 'preact';

import compose from 'utilities/compose';
import { toRankingPlayer } from 'utilities/state_mapping';
import { withState } from '@state';

import RankableTopics from 'components/game/rankable_topics';

const Body = ({ header, subheader, gameState }) => {
  return (
    <div class="game-body">
      <h1>{header}</h1>
      <span>{subheader}</span>

      {gameState === 'ranking' && <RankableTopics />}
    </div>
  );
};

// state
const withGameState = withState('game.state', 'gameState');
const withPlayerUidState = withState('playerUid');
const withRankingPlayerState = withState(
  'game',
  'rankingPlayer',
  toRankingPlayer
);

const withProps = WrappedComponent => {
  return props => {
    const { gameState, playerUid, rankingPlayer } = props;

    let header;
    let subheader;

    if (!gameState) {
      header = 'Waiting!';
      subheader = '...for someone to start ranking.';
    } else if (gameState === 'ranking') {
      if (playerUid === rankingPlayer.uid) {
        header = 'Rank!';
        subheader = '...the following topics, best to worst.';
      } else {
        header = 'Guess!';
        subheader = `...how ${rankingPlayer.name} would rank the following topics.`;
      }
    } else if (gameState === 'ranked') {
    }

    return (
      <WrappedComponent {...props} header={header} subheader={subheader} />
    );
  };
};

const wrappers = compose(
  withGameState,
  withPlayerUidState,
  withRankingPlayerState,
  withProps
);

export { Body };
export default wrappers(Body);
