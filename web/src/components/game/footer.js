import { h } from 'preact';
import { Paper } from '@material-ui/core';
import compose from 'utilities/compose';

import { withAction } from '@state';
import { startRound, lockIn } from '@actions';
import withRouter, { toAddTopics } from 'utilities/router';

import { footerContentForState } from 'components/game/game_state_helpers';
import { logEvent } from '@services/logger';

const Footer = ({ gameState, startRound, lockIn, routes: [toAddTopics] }) => {
  const handleAddMoreTopics = () => {
    toAddTopics();

    logEvent('in_game', 'add_more_topics');
  };

  return (
    <Paper elevation={3}>
      <div class="game-footer">
        {footerContentForState({
          gameState,
          startRound,
          lockIn,
          addMoreTopics: handleAddMoreTopics
        })}
      </div>
    </Paper>
  );
};

// actions
const withStartRoundAction = withAction(startRound, 'startRound');
const withLockInAction = withAction(lockIn, 'lockIn');

// routes
const withRoutes = withRouter(toAddTopics);

const wrappers = compose(withStartRoundAction, withLockInAction, withRoutes);

export { Footer };
export default wrappers(Footer);
