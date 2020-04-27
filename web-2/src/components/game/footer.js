import { h } from 'preact';
import { Paper } from '@material-ui/core';
import compose from 'utilities/compose';

import { withAction } from '@state';
import { startRound, lockIn } from '@actions';

import { footerContentForState } from 'components/game/game_state_helpers';

const Footer = ({ gameState, startRound, lockIn }) => {
  return (
    <Paper elevation={3}>
      <div class="game-footer">
        {footerContentForState({ gameState, startRound, lockIn })}
      </div>
    </Paper>
  );
};

// actions
const withStartRoundAction = withAction(startRound, 'startRound');
const withLockInAction = withAction(lockIn, 'lockIn');

const wrappers = compose(withStartRoundAction, withLockInAction);

export { Footer };
export default wrappers(Footer);
