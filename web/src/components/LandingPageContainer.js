import React, { Component } from 'react';
import { connect } from 'react-redux';

import LandingPage from './LandingPage';

import {
  joinGame,
  gameIdChanged,
  startGame,
  nameChanged,
  showJoinGameSection
} from '../actions';

class LandingPageContainer extends Component {
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

  render() {
    const {
      gameId,
      error,
      loading,
      startGameEnabled,
      joinGameEnabled,
      joinEnabled,
      showJoinGame,
      joinGame,
      startGame,
      showJoinGameSection
    } = this.props;

    return (
      <LandingPage 
        gameId={gameId}
        error={error}
        loading={loading}
        startGameEnabled={startGameEnabled}
        joinGameEnabled={joinGameEnabled}
        joinEnabled={joinEnabled}
        showJoinGame={showJoinGame}
        joinGame={joinGame}
        gameIdChanged={this.gameIdChanged}
        startGame={startGame}
        nameChanged={this.nameChanged}
        showJoinGameSection={showJoinGameSection}
      />
    )
  }
}

const mapStateToProps = ({ LandingPage }) => ({
  gameId: LandingPage.gameId,
  error: LandingPage.error,
  loading: LandingPage.loading,
  startGameEnabled: LandingPage.startGameEnabled,
  joinGameEnabled: LandingPage.joinGameEnabled,
  joinEnabled: LandingPage.joinEnabled,
  showJoinGame: LandingPage.showJoinGame
});

export default connect(
  mapStateToProps,
  {
    joinGame,
    gameIdChanged,
    startGame,
    nameChanged,
    showJoinGameSection
  }
)(LandingPageContainer);