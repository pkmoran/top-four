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
    this.startGame = this.startGame.bind(this);
    this.joinGame = this.joinGame.bind(this);
  }

  gameIdChanged(event) {
    this.props.gameIdChanged(event.target.value);
  }

  nameChanged(event) {
    this.props.nameChanged(event.target.value);
  }

  startGame() {
    this.props.startGame(this.props.history);
  }

  joinGame() {
    this.props.joinGame(this.props.gameId, this.props.history);
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
      showJoinGameSection
    } = this.props;

    const {
      gameIdChanged,
      nameChanged,
      startGame,
      joinGame
    } = this;

    return (
      <LandingPage 
        { ... { 
          gameId, 
          error,
          loading,
          startGameEnabled,
          joinGameEnabled,
          joinEnabled,
          showJoinGame,
          joinGame,
          gameIdChanged,
          startGame,
          nameChanged,
          showJoinGameSection
        }}
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