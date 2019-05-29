import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import StartGameDialog from './StartGameDialog';

import './styles/LandingPage.css';

class LandingPageComponent extends Component {
  render() {
    return (
      <div className="LandingPage">
        <div className="LandingPage__join-game-container">
          <h1>Top Four&trade; <span>v1.10.5</span></h1>

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
