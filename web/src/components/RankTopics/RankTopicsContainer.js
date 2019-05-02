import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import RankTopics from './RankTopics';
import requireGame from '../requireGame';

import {
  updateMyRanks,
  showLockInDialog,
  hideLockInDialog,
  lockIn,
  endRound,
  roundEnded,
  uploadScore,
  hideRevealDialog,
  reveal,
  revealAll
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

  componentDidUpdate(previousProps) {
    if (previousProps.state === 'ranking' && this.props.state === 'ranked' && !this.props.active) {
      this.props.uploadScore(this.props.topics);
    }

    if (previousProps.state === 'ranked' && this.props.state === '') {
      this.props.roundEnded(this.props.history);
    }
  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    this.props.updateMyRanks(this.props.topics, result.source.index, result.destination.index);
  }

  lockIn() {
    // force ranks to update in case they never have
    this.props.updateMyRanks(this.props.topics, 0, 0);
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
      endRound,
      numPlayersLockedIn,
      numTotalPlayers,
      showRevealDialog,
      hideRevealDialog,
      lockedIn
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

export const getTopics = (topics, optionalLocalRanks) => {
  const activeTopics = _.filter(topics.array, topic => topic.status === 'active' || topic.status === 'ranked');

  let localRanks;
  if (Object.keys(optionalLocalRanks).length === 0) {
    localRanks = _.reduce(
      activeTopics,
      (result, value, index) => ({
        ...result,
        [value.uid]: index
      }),
      {}
    );
  } else {
    localRanks = optionalLocalRanks;
  }

  const sortedTopics = _.sortBy(activeTopics, [
    topic => localRanks[topic.uid]
  ]);

  _.forEach(sortedTopics, (topic, index) => {
    topic.isCorrect = index === topic.rank;
    topic.correctTopic = _.find(activeTopics, (topic) => index === topic.rank);
  });

  return sortedTopics;
};

const mapStateToProps = ({ Game, RankTopics }) => ({
  gameId: Game.gameId,
  topics: getTopics(Game.topics, RankTopics.localRanks),
  active: Game.playerUid === Game.rankingPlayerUid,
  activePlayerName: (Game.players.map[Game.rankingPlayerUid] || {}).name,
  state: Game.state,
  showDialog: RankTopics.showDialog,
  numPlayersLockedIn: _.filter(Game.players.array, { lockedIn: true }).length,
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
    uploadScore,
    hideRevealDialog,
    reveal,
    revealAll
  }
)(requireGame(RankTopicsContainer));
