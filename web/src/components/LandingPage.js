import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import {
  joinGame,
  gameIdChanged,
  startGame,
  nameChanged,
  showJoinGameSection
} from '../actions';

import './styles/LandingPage.css';

class LandingPageComponent extends Component {
  constructor(props) {
    super(props);

    this.gameIdChanged = this.gameIdChanged.bind(this);
    this.nameChanged = this.nameChanged.bind(this);
  }

  gameIdChanged(event) {
    this.props.gameIdChanged(event.target.value);
  }

  nameChanged(event) {
    this.props.nameChanged(event.target.value);
  }

  renderButtonSection() {
    if (this.props.loading) {
      return <CircularProgress />;
    }

    return (
      <div className="ButtonSection">
        <Button
          onClick={() => this.props.startGame(this.props.history)}
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
            onChange={this.gameIdChanged}
            value={this.props.gameId}
            id="gameId"
            label="Game ID"
            placeholder="e.g. A9"
          />

          <Button
            onClick={() => this.props.joinGame(this.props.gameId, this.props.history)}
            disabled={!this.props.joinEnabled}
          >
            Join
          </Button>

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
        <h1>Top Four TM v1.0</h1>

        <TextField
          onChange={this.nameChanged}
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

const mapStateToProps = ({ LandingPage }) => {
  const {
    gameId,
    error,
    loading,
    startGameEnabled,
    joinGameEnabled,
    joinEnabled,
    showJoinGame
  } = LandingPage;

  return {
    gameId,
    error,
    loading,
    startGameEnabled,
    joinGameEnabled,
    joinEnabled,
    showJoinGame
  };
};

export default connect(
  mapStateToProps,
  {
    joinGame,
    gameIdChanged,
    startGame,
    nameChanged,
    showJoinGameSection
  }
)(LandingPageComponent);
