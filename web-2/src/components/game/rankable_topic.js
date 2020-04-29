import { h } from 'preact';
import { Paper, Button } from '@material-ui/core';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

import cx from 'utilities/cx';
import { GAME_STATE } from 'utilities/constants';
import { withAction } from '@state';
import { revealTopic } from '@actions';

const renderTopicIfUnranked = (isRanked, topic) => {
  if (!isRanked) return <span class="rankable-topic__name">{topic}</span>;
};

const renderIncorrectTopicIfRanked = (isRanked, isCorrect, topic) => {
  if (isRanked && !isCorrect) {
    return (
      <span class="rankable-topic__name">
        <strike>{topic}</strike>
      </span>
    );
  }
};

const renderCorrectTopicIfRanked = (isRanked, correctTopic) => {
  if (isRanked) {
    return <span class="rankable-topic__name">{correctTopic.topic}</span>;
  }
};

const maybeRenderRevealButton = (
  state,
  topicStatus,
  ranker,
  unlockedInPlayers,
  handleReveal
) => {
  if (
    state === GAME_STATE.LOCKED_IN &&
    ranker &&
    topicStatus !== 'ranked' &&
    unlockedInPlayers.length === 0
  ) {
    return (
      <Button
        name="reveal_button"
        variant="outlined"
        color="primary"
        onClick={handleReveal}
      >
        Reveal!
      </Button>
    );
  }
};

const maybeRenderCorrectPercent = (
  state,
  topicStatus,
  ranker,
  correctPercent
) => {
  if (
    state !== GAME_STATE.RANKING &&
    ranker &&
    topicStatus === 'ranked' &&
    correctPercent
  ) {
    return <span>{correctPercent}</span>;
  }
};

const RankableTopic = ({
  topic: {
    uid,
    topic,
    status: topicStatus,
    rank,
    localRank,
    correctTopic,
    correctPercent
  },
  gameState: { state, ranker, unlockedInPlayers },
  dragging,
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
    <Paper elevation={dragging ? 7 : 1}>
      <div class={topicClasses}>
        <div class="rankable-topic__names">
          {renderTopicIfUnranked(isRanked, topic)}

          {renderIncorrectTopicIfRanked(isRanked, isCorrect, topic)}

          {renderCorrectTopicIfRanked(isRanked, correctTopic)}
        </div>

        {state === GAME_STATE.RANKING && <DragIndicatorIcon />}

        {maybeRenderRevealButton(
          state,
          topicStatus,
          ranker,
          unlockedInPlayers,
          handleReveal
        )}

        {maybeRenderCorrectPercent(state, topicStatus, ranker, correctPercent)}
      </div>
    </Paper>
  );
};

// actions
const withRevealTopicAction = withAction(revealTopic, 'revealTopic');

export { RankableTopic };
export default withRevealTopicAction(RankableTopic);
