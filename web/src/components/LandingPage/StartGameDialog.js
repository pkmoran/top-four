import React, { Component } from 'react';

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

class StartGameDialog extends Component {

  renderPickTeams() {
    const { open, onClose, onNext, onTeamNumberChange, value } = this.props;

    return (
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
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="outlined" onClick={onNext}>
            Next
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  renderPickTopicPack() {
    const { open, onClose, onBack, onOk, topicPacks, topicPackUid, onTopicPackChange } = this.props;

    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Play with a topic pack?</DialogTitle>
        <DialogContent>

          <form className="PickTopicPackForm">
            <FormControl>
              <InputLabel htmlFor="topic-packs-dropdown">Topic Packs</InputLabel>

              <Select
                native
                value={topicPackUid}
                onChange={onTopicPackChange}
                input={<Input id="topic-packs-dropdown" />}
              >
                {topicPacks.map(topicPack => (
                  <option key={topicPack.uid} value={topicPack.uid}>{topicPack.name}</option>
                ))}
              </Select>
            </FormControl>
          </form>

        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <Button variant="outlined" onClick={onBack}>
            Back
          </Button>

          <Button variant="outlined" onClick={onOk}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  render() {
    if (this.props.startGameStep === 'pickTeams') {
      return this.renderPickTeams();
    }

    return this.renderPickTopicPack();
  }
}

export default StartGameDialog;