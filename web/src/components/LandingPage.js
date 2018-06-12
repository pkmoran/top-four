import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { joinGame, gameIdChanged, startGame } from '../actions';

import './styles/LandingPage.css';

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.gameIdChanged = this.gameIdChanged.bind(this);
  }

  gameIdChanged(event) {
    this.props.gameIdChanged(event.target.value);
  }

  renderStartGameButton() {
    if (this.props.loading) {
      return <CircularProgress />;
    }

    return <Button onClick={this.props.startGame}>Start Game</Button>;
  }

  renderJoinGameButton() {
    if (this.props.loading) {
      return <CircularProgress />;
    }

    return (
      <Button
        onClick={() => this.props.joinGame(this.props.gameId)}
      >
        Join Game
      </Button>
    );
  }

  render() {
    return (
      <div className="LandingPage">
        <h1>Top Four - {this.props.azs}</h1>
        {this.renderStartGameButton()}
        <div>
          <TextField
            onChange={this.gameIdChanged}
            value={this.props.gameId}
            id="gameId"
            placeholder="Game ID"
            helperText={this.props.error}
            error={!!this.props.error}
          />
          {this.renderJoinGameButton()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  gameId: state.LandingPage.gameId,
  error: state.LandingPage.error,
  loading: state.LandingPage.loading,
  azs: state.LandingPage.azs
});

export default connect(mapStateToProps, { joinGame, gameIdChanged, startGame })(LandingPage);
