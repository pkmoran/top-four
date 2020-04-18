import { h } from 'preact';
import { Paper, Button } from '@material-ui/core';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

import { GAME_STATE } from 'utilities/constants';

const RankableTopic = ({
  topic,
  gameState: { state, ranker, unlockedInPlayers }
}) => {
  return (
    <Paper>
      <div class="rankable-topic">
        <span class="rankable-topic__name">{topic.topic}</span>
        {state !== GAME_STATE.LOCKED_IN && <DragIndicatorIcon />}
        {state === GAME_STATE.LOCKED_IN &&
          ranker &&
          unlockedInPlayers.length === 0 && (
            <Button variant="outlined" color="primary">
              Reveal!
            </Button>
          )}
      </div>
    </Paper>
  );
};

export { RankableTopic };
export default RankableTopic;
