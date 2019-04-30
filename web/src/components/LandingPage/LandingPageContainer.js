import React, { Component } from 'react';
import { connect } from 'react-redux';

import LandingPage from './LandingPage';

import {
  joinGame,
  gameIdChanged,
  startGame,
  nameChanged,
  showJoinGameSection,
  showStartGameDialog,
  hideStartGameDialog,
  teamNumberChanged
} from '../../actions';

class LandingPageContainer extends Component {
  constructor(props) {
    super(props);

    this.gameIdChanged = this.gameIdChanged.bind(this);
    this.nameChanged = this.nameChanged.bind(this);
    this.teamNumberChanged = this.teamNumberChanged.bind(this);
    this.startGame = this.startGame.bind(this);
    this.joinGame = this.joinGame.bind(this);
  }

  gameIdChanged(event) {
    this.props.gameIdChanged(event.target.value);
  }

  nameChanged(event) {
    this.props.nameChanged(event.target.value);
  }

  teamNumberChanged(event) {
    console.log(event.target.value);
    this.props.teamNumberChanged(event.target.value);
  }

  startGame() {
    this.props.startGame(this.props.numberOfTeams, this.props.history);
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
      showJoinGameSection,
      showDialog,
      showStartGameDialog,
      hideStartGameDialog
    } = this.props;

    const {
      gameIdChanged,
      nameChanged,
      startGame,
      joinGame,
      teamNumberChanged
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
          showJoinGameSection,
          showDialog,
          teamNumberChanged,
          showStartGameDialog,
          hideStartGameDialog
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
  showJoinGame: LandingPage.showJoinGame,
  showDialog: LandingPage.showDialog,
  numberOfTeams: LandingPage.numberOfTeams
});

export default connect(
  mapStateToProps,
  {
    joinGame,
    gameIdChanged,
    startGame,
    nameChanged,
    showJoinGameSection,
    showStartGameDialog,
    hideStartGameDialog,
    teamNumberChanged
  }
)(LandingPageContainer);