import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import './styles/StartGameDialog.css';

const StartGameDialog = ({
  open, onClose, onOk, onTeamNumberChange, value
}) => (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>How many teams?</DialogTitle>
      <DialogContent>
        <form>
          <FormControl>
            <InputLabel htmlFor="teams-dropdown">Teams</InputLabel>

            <Select
              native
              value={value}
              onChange={onTeamNumberChange}
              input={<Input id="teams-dropdown" />}
            >
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </Select>
          </FormControl>
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onOk}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );

export default StartGameDialog;