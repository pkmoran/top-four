import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import './styles/ChoiceDialog.css';

const ChoiceDialog = ({
  open, titleText, contentText, choiceOneText, onChoiceOne, choiceTwoText, onChoiceTwo, onClose
}) => (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{titleText}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {contentText}
        </DialogContentText>

        <DialogActions>
          <Button variant="outlined" onClick={onChoiceOne}>{choiceOneText}</Button>

          <Button variant="outlined" onClick={onChoiceTwo}>{choiceTwoText}</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );

export default ChoiceDialog;
