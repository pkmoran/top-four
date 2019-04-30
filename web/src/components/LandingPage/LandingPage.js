import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import './styles/LandingPage.css';

class LandingPageComponent extends Component {
  renderButtonSection() {
    if (this.props.loading) {
      return <CircularProgress />;
    }

    return (
      <div className="ButtonSection">
        <Button
          onClick={() => this.props.startGame()}
          disabled={!this.props.startGameEnabled}
        >
          Start Game
        </Button>

        <span>OR</span>

        <Button
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
        <h1>Top Four TM v1.6</h1>

        <TextField
          onChange={this.props.nameChanged}
          value={this.props.name}
          id="name"
          label="Name"
          placeholder="e.g. Harry Grundle"
        />

        {this.renderButtonSection()}

        {this.renderJoinGameSection()}
      </div>
    );
  }
}

export default LandingPageComponent;
