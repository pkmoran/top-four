import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Button } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import cx from 'utilities/cx';
import { logEvent } from '@services/logger';

const ConfirmButton = ({ confirmText, confirmAction, prefix }) => {
  const [confirming, setConfirming] = useState(false);

  const actionsClasses = cx('confirm-button', {
    'visibility--hidden': !confirmAction
  });

  const handleConfirm = () => {
    setConfirming(false);
    confirmAction();
  };

  const handleCancel = () => {
    setConfirming(false);

    logEvent('in_game', 'cancel_confirm', confirmText);
  };

  return (
    <div class={actionsClasses}>
      {confirming && (
        <span class="confirm-button__cancel">
          <Button variant="outlined" color="primary" onClick={handleCancel}>
            <CloseIcon />
          </Button>
        </span>
      )}

      <span class="confirm-button__action">
        {!confirming && (
          <>
            {prefix && <span class="confirm-button__prefix">{prefix}</span>}
            <Button
              variant="contained"
              color="primary"
              onClick={() => setConfirming(true)}
            >
              {confirmText || ''}
            </Button>
          </>
        )}
        {confirming && (
          <span class="confirm-button__action--confirming">You sure?</span>
        )}
      </span>

      {confirming && (
        <span class="confirm-button__confirm">
          <Button variant="outlined" color="primary" onClick={handleConfirm}>
            <CheckIcon />
          </Button>
        </span>
      )}
    </div>
  );
};

export { ConfirmButton };
export default ConfirmButton;
