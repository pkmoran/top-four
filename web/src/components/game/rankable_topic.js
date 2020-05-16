import { h } from 'preact';
import { Paper, Button } from '@material-ui/core';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

import cx from 'utilities/cx';
import { GAME_STATE } from 'utilities/constants';
import { withAction } from '@state';
import { revealTopic } from '@actions';
import { logErrorMessage } from '@services/logger';

import CorrectLogo from 'components/shared/correct_logo';
import IncorrectLogo from 'components/shared/incorrect_logo';

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

const maybeRenderCorrectLogo = (ranker, isRanked, isCorrect) => {
  if (!ranker && isRanked && isCorrect) return <CorrectLogo />;
};

const maybeRenderIncorrectLogo = (ranker, isRanked, isCorrect) => {
  if (!ranker && isRanked && !isCorrect) return <IncorrectLogo />;
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
    return <span name="percent">{correctPercent}</span>;
  }
};

const RankableTopic = ({
  topic: topicObj,
  gameState: { state, ranker, unlockedInPlayers },
  dragging,
  revealTopic
}) => {
  if (!topicObj) {
    logErrorMessage('missing topic in RankableTopic');
  }

  const {
    uid,
    topic,
    status: topicStatus,
    rank,
    localRank,
    correctTopic,
    correctPercent
  } = topicObj;
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

        {maybeRenderCorrectLogo(ranker, isRanked, isCorrect)}

        {maybeRenderIncorrectLogo(ranker, isRanked, isCorrect)}
      </div>
    </Paper>
  );
};

// actions
const withRevealTopicAction = withAction(revealTopic, 'revealTopic');

export { RankableTopic };
export default withRevealTopicAction(RankableTopic);
