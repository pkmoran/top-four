import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Button, IconButton, Paper } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import cx from 'utilities/cx';
import compose from 'utilities/compose';

import { withAction } from '@state';
import { startRound, lockIn } from '@actions';

import { footerState } from 'components/game/game_state_helpers';

const Footer = ({ helperText, confirmText, confirmAction }) => {
  const [confirming, setConfirming] = useState(false);

  const actionsClasses = cx('game-footer__actions', {
    'visibility--hidden': !confirmAction
  });

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
        <div class={actionsClasses}>
          <span class={cancelClasses}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setConfirming(false)}
            >
              <CloseIcon />
            </Button>
          </span>

          <span class="game-footer__action">
            {!confirming && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setConfirming(true)}
              >
                {confirmText || ''}
              </Button>
            )}
            {confirming && (
              <span class="game-footer__action--confirming">You sure?</span>
            )}
          </span>

          <span class={confirmClasses}>
            <Button variant="outlined" color="primary" onClick={handleConfirm}>
              <CheckIcon />
            </Button>
          </span>
        </div>
      </div>
    </Paper>
  );
};

// actions
const withStartRoundAction = withAction(startRound, 'startRound');
const withLockInAction = withAction(lockIn, 'lockIn');

const withProps = WrappedComponent => {
  return props => {
    const { helperText, confirmText, confirmAction } = footerState(props);

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

const wrappers = compose(withStartRoundAction, withLockInAction, withProps);

export { Footer };
export default wrappers(Footer);
