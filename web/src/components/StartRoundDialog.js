import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

import './styles/StartRoundDialog.css';

const StartRoundDialog = ({
  open, playerName, onYes, onNo
}) => (
  <Dialog onClose={onNo} open={open}>
    <DialogTitle>Start a new round?</DialogTitle>
    <DialogContent>
      <DialogContentText>
        {playerName}, you&apos;re up! Is the group ready?
      </DialogContentText>

      <div className="StartRoundDialogButtons">
        <Button onClick={onYes}>Yep!</Button>

        <Button onClick={onNo}>Nope!</Button>
      </div>
    </DialogContent>
  </Dialog>
);

export default StartRoundDialog;
