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
  teamNumberChanged,
  showPickTeams,
  showPickTopicPacks,
  topicPackChanged
} from '../../actions';

class LandingPageContainer extends Component {
  constructor(props) {
    super(props);

    this.gameIdChanged = this.gameIdChanged.bind(this);
    this.nameChanged = this.nameChanged.bind(this);
    this.teamNumberChanged = this.teamNumberChanged.bind(this);
    this.topicPackChanged = this.topicPackChanged.bind(this);
    this.startGame = this.startGame.bind(this);
    this.joinGame = this.joinGame.bind(this);
    this.onBack = this.onBack.bind(this);
    this.onNext = this.onNext.bind(this);
  }

  gameIdChanged(event) {
    this.props.gameIdChanged(event.target.value);
  }

  nameChanged(event) {
    this.props.nameChanged(event.target.value);
  }

  teamNumberChanged(event) {
    this.props.teamNumberChanged(event.target.value);
  }

  topicPackChanged(event) {
    this.props.topicPackChanged(event.target.value);
  }

  startGame() {
    this.props.startGame(this.props.numberOfTeams, this.props.topicPackUid, this.props.history);
  }

  joinGame() {
    this.props.joinGame(this.props.gameId, this.props.history);
  }

  onBack() {
    this.props.showPickTeams();
  }

  onNext() {
    this.props.showPickTopicPacks();
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
      hideStartGameDialog,
      startGameStep,
      topicPacks,
      topicPackUid
    } = this.props;

    const {
      gameIdChanged,
      nameChanged,
      startGame,
      joinGame,
      teamNumberChanged,
      onBack,
      onNext,
      topicPackChanged
    } = this;

    return (
      <LandingPage
        {... {
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
          hideStartGameDialog,
          startGameStep,
          onBack,
          onNext,
          topicPacks,
          topicPackUid,
          topicPackChanged
        }}
      />
    )
  }
}

const mapStateToProps = ({ Game, LandingPage }) => ({
  gameId: LandingPage.gameId,
  error: LandingPage.error,
  loading: LandingPage.loading,
  startGameEnabled: LandingPage.startGameEnabled,
  joinGameEnabled: LandingPage.joinGameEnabled,
  joinEnabled: LandingPage.joinEnabled,
  showJoinGame: LandingPage.showJoinGame,
  showDialog: LandingPage.showDialog,
  numberOfTeams: LandingPage.numberOfTeams,
  startGameStep: LandingPage.startGameStep,
  topicPacks: Game.topicPacks,
  topicPackUid: LandingPage.topicPackUid
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
    teamNumberChanged,
    showPickTeams,
    showPickTopicPacks,
    topicPackChanged
  }
)(LandingPageContainer);