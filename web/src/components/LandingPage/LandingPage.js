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

  render() {
    return (
      <div className="LandingPage">
        <div className="LandingPage__join-game-container">
          <h1>Top Four TM v1.10.4</h1>

          <TextField
            onChange={this.props.nameChanged}
            value={this.props.name}
            id="name"
            label="Name"
            placeholder="e.g. Harry Grundle"
          />

          <span className="LandingPage__join-game-input">
            <TextField
              onChange={this.props.gameIdChanged}
              value={this.props.gameId}
              label="Game ID"
              placeholder="A9"
            />

            {this.props.loading ? (
              <CircularProgress />
            ) : (
              <Button
                variant="contained"
                onClick={() => this.props.joinGame()}
                disabled={!this.props.joinEnabled}
              >
                Play!
              </Button>
            )}
          </span>
        </div>

        <div className="LandingPage__start-game-button">
          {this.props.loading ? (
            <CircularProgress />
          ) : (
            <Button
              variant="contained"
              onClick={() => this.props.showStartGameDialog()}
              disabled={!this.props.startGameEnabled}
            >
              Start New Game
            </Button>
          )}
        </div>

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
