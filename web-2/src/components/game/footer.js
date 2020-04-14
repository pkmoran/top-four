import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Button, IconButton, Paper } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import cx from 'utilities/cx';
import compose from 'utilities/compose';

import { withAction, withState } from '@state';
import { startRound } from '@actions';

const Footer = ({ confirmText, helperText, confirmAction }) => {
  const [confirming, setConfirming] = useState(false);

  const confirmClasses = cx('game-footer__confirm-action', {
    'visibility--hidden': !confirming
  });

  const cancelClasses = cx('game-footer__cancel-action', {
    'visibility--hidden': !confirming
  });

  const handleConfirm = () => {
    setConfirming(false);
    confirmAction();
  };

  return (
    <Paper elevation={3}>
      <div class="game-footer">
        {helperText}
        <div class="game-footer__actions">
          <span class={confirmClasses}>
            <Button variant="outlined" color="primary" onClick={handleConfirm}>
              <CheckIcon />
            </Button>
          </span>

          <span class="game-footer__action">
            {!confirming && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setConfirming(true)}
              >
                {confirmText}
              </Button>
            )}
            {confirming && (
              <span class="game-footer__action--confirming">You sure?</span>
            )}
          </span>

          <span class={cancelClasses}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setConfirming(false)}
            >
              <CloseIcon />
            </Button>
          </span>
        </div>
      </div>
    </Paper>
  );
};

// state
const withGameState = withState('game.state', 'gameState');

// actions
const withStartRoundAction = withAction(startRound, 'startRound');

const withProps = WrappedComponent => {
  return props => {
    const { gameState, startRound } = props;

    let helperText;
    let confirmText;
    let confirmAction;

    if (!gameState) {
      helperText = 'Whose turn is it to rank?';
      confirmText = `I'm up!`;
      confirmAction = startRound;
    } else if (gameState === 'ranking') {
      helperText = 'Feel good about your ranks?';
      confirmText = `Lock 'em in!`;
      confirmAction = () => {};
    } else if (gameState === 'ranked') {
    }

    return (
      <WrappedComponent
        {...props}
        confirmText={confirmText}
        helperText={helperText}
        confirmAction={confirmAction}
      />
    );
  };
};

const wrappers = compose(withGameState, withStartRoundAction, withProps);

export { Footer };
export default wrappers(Footer);
