import React, { Component } from 'react';
import { connect } from 'react-redux';
import filter from 'lodash/filter';

import RankTopics from './RankTopics';
import requireGame from '../requireGame';

import {
  updateMyRanks,
  showLockInDialog,
  hideLockInDialog,
  lockIn,
  endRound,
  roundEnded,
  hideRevealDialog,
  reveal,
  revealAll,
  watchGameStateForRankTopics,
  stopWatchingGameStateForRankTopics
} from '../../actions';

class RankTopicsContainer extends Component {
  constructor(props) {
    super(props);

    this.onDragEnd = this.onDragEnd.bind(this);
    this.lockIn = this.lockIn.bind(this);
    this.reveal = this.reveal.bind(this);
    this.revealAll = this.revealAll.bind(this);
    this.confirmReveal = this.confirmReveal.bind(this);
  }

  componentDidMount() {
    this.props.watchGameStateForRankTopics(this.props.history);
  }

  componentWillUnmount() {
    this.props.stopWatchingGameStateForRankTopics();
  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    this.props.updateMyRanks(this.props.topics, result.source.index, result.destination.index);
  }

  lockIn() {
    this.props.lockIn();
  }

  reveal(topic) {
    this.props.reveal(topic, false);
  }

  revealAll() {
    this.props.revealAll(false);
  }

  confirmReveal() {
    this.props.pendingRevealAction();
  }

  render() {
    const {
      gameId,
      topics,
      active,
      activePlayerName,
      state,
      showDialog,
      showLockInDialog,
      hideLockInDialog,
      numPlayersLockedIn,
      numTotalPlayers,
      showRevealDialog,
      hideRevealDialog,
      lockedIn,
      endRound
    } = this.props;

    const {
      onDragEnd,
      lockIn,
      reveal,
      revealAll,
      confirmReveal
    } = this;

    return (
      <RankTopics
        {... {
          gameId,
          topics,
          active,
          activePlayerName,
          state,
          showDialog,
          showLockInDialog,
          hideLockInDialog,
          lockIn,
          endRound,
          onDragEnd,
          numPlayersLockedIn,
          numTotalPlayers,
          showRevealDialog,
          hideRevealDialog,
          reveal,
          revealAll,
          confirmReveal,
          lockedIn
        }}
      />
    )
  }
}

const mapStateToProps = ({ Game, RankTopics }) => ({
  gameId: Game.gameId,
  topics: RankTopics.topics,
  active: Game.playerUid === Game.rankingPlayerUid,
  activePlayerName: (Game.players.map[Game.rankingPlayerUid] || {}).name,
  state: Game.state,
  showDialog: RankTopics.showDialog,
  numPlayersLockedIn: filter(Game.players.array, { lockedIn: true }).length,
  numTotalPlayers: Game.players.array.length,
  lockedIn: RankTopics.lockedIn,
  showRevealDialog: RankTopics.showRevealDialog,
  pendingRevealAction: RankTopics.pendingRevealAction
});

export default connect(
  mapStateToProps,
  {
    updateMyRanks,
    showLockInDialog,
    hideLockInDialog,
    lockIn,
    endRound,
    roundEnded,
    hideRevealDialog,
    reveal,
    revealAll,
    watchGameStateForRankTopics,
    stopWatchingGameStateForRankTopics
  }
)(requireGame(RankTopicsContainer));
