import { h } from 'preact';
import { Paper, Button } from '@material-ui/core';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

import cx from 'utilities/cx';
import { GAME_STATE } from 'utilities/constants';
import { withAction } from '@state';
import { revealTopic } from '@actions';

const RankableTopic = ({
  topic: {
    uid,
    topic,
    status,
    rank,
    localRank,
    correctTopic,
    correctGuesses,
    totalGuesses
  },
  gameState: { state, ranker, unlockedInPlayers },
  revealTopic
}) => {
  const handleReveal = () => {
    revealTopic(uid);
  };

  const isRanked = correctTopic && correctTopic.status === 'ranked';
  const isCorrect = localRank === rank;

  const topicClasses = cx('rankable-topic', {
    'rankable-topic--correct': !ranker && isRanked && isCorrect,
    'rankable-topic--incorrect': !ranker && isRanked && !isCorrect
  });

  return (
    <Paper>
      <div class={topicClasses}>
        <div class="rankable-topic__names">
          {!isRanked && <span class="rankable-topic__name">{topic}</span>}
          {isRanked && !isCorrect && (
            <span class="rankable-topic__name">
              <strike>{topic}</strike>
            </span>
          )}
          {isRanked && (
            <span class="rankable-topic__name">{correctTopic.topic}</span>
          )}
        </div>

        {state === GAME_STATE.RANKING && <DragIndicatorIcon />}

        {state === GAME_STATE.LOCKED_IN &&
          ranker &&
          unlockedInPlayers.length === 0 &&
          status !== 'ranked' && (
            <Button
              name="reveal_button"
              variant="outlined"
              color="primary"
              onClick={handleReveal}
            >
              Reveal!
            </Button>
          )}

        {state !== GAME_STATE.RANKING && ranker && status === 'ranked' && (
          <span>{`${correctGuesses}/${totalGuesses}`}</span>
        )}

        {state !== GAME_STATE.RANKING && !ranker && isRanked && (
          <span>{`${correctGuesses}/${totalGuesses}`}</span>
        )}
      </div>
    </Paper>
  );
};

// actions
const withRevealTopicAction = withAction(revealTopic, 'revealTopic');

export { RankableTopic };
export default withRevealTopicAction(RankableTopic);
