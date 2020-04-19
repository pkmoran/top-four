import { h } from 'preact';
import { Paper, Button } from '@material-ui/core';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

import { GAME_STATE } from 'utilities/constants';
import { withAction } from '@state';
import { revealTopic } from '@actions';

const RankableTopic = ({
  topic: { uid, topic, status },
  gameState: { state, ranker, unlockedInPlayers },
  revealTopic
}) => {
  const handleReveal = () => {
    revealTopic(uid);
  };

  return (
    <Paper>
      <div class="rankable-topic">
        <span class="rankable-topic__name">{topic}</span>
        <span class="rankable-topic__right-content">
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
        </span>
      </div>
    </Paper>
  );
};

// actions
const withRevealTopicAction = withAction(revealTopic, 'revealTopic');

export { RankableTopic };
export default withRevealTopicAction(RankableTopic);
