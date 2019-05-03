import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import StartGameDialog from './StartGameDialog';

import './styles/LandingPage.css';

class LandingPageComponent extends Component {
  renderButtonSection() {
    if (this.props.loading) {
      return <CircularProgress />;
    }

    return (
      <div className="ButtonSection">
        <Button
          variant="contained"
          onClick={() => this.props.showStartGameDialog()}
          disabled={!this.props.startGameEnabled}
        >
          Start Game
        </Button>

        <span>OR</span>

        <Button
          variant="contained"
          onClick={() => this.props.showJoinGameSection()}
          disabled={!this.props.joinGameEnabled}
        >
          Join Game
        </Button>
      </div>
    );
  }

  renderJoinGameSection() {
    if (this.props.showJoinGame) {
      return (
        <div>
          <TextField
            onChange={this.props.gameIdChanged}
            value={this.props.gameId}
            id="gameId"
            label="Game ID"
            placeholder="e.g. A9"
          />
          
          {
            this.props.loading ? <CircularProgress /> :
            <Button
              variant="contained"
              onClick={() => this.props.joinGame()}
              disabled={!this.props.joinEnabled}
            >
              Join
            </Button>
          }

        </div>
      );
    }

    return (
      <br />
    );
  }

  render() {
    return (
      <div className="LandingPage">
        <h1>Top Four TM v1.10.1</h1>

        <TextField
          onChange={this.props.nameChanged}
          value={this.props.name}
          id="name"
          label="Name"
          placeholder="e.g. Harry Grundle"
        />

        {this.renderButtonSection()}

        {this.renderJoinGameSection()}

        <StartGameDialog 
          open={this.props.showDialog}
          onClose={this.props.hideStartGameDialog}
          onBack={this.props.onBack}
          onNext={this.props.onNext}
          onOk={this.props.startGame}
          value={this.props.numberOfTeams}
          onTeamNumberChange={this.props.teamNumberChanged}
          startGameStep={this.props.startGameStep}
          topicPacks={this.props.topicPacks}
          topicPackUid={this.props.topicPackUid}
          onTopicPackChange={this.props.topicPackChanged}
        />
      </div>
    );
  }
}

export default LandingPageComponent;
