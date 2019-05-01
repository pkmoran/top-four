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
  uploadScore
} from '../../actions';

class RankTopicsContainer extends Component {
  constructor(props) {
    super(props);

    this.onDragEnd = this.onDragEnd.bind(this);
    this.lockIn = this.lockIn.bind(this);
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
      endRound
    } = this.props;

    const {
      onDragEnd,
      lockIn
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
          onDragEnd
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
    if (!topic.isCorrect) {
      topic.correctTopic = _.find(activeTopics, (topic) => index === topic.rank);
    }
  });

  return sortedTopics;
};

const mapStateToProps = ({ Game, RankTopics }) => ({
  gameId: Game.gameId,
  topics: getTopics(Game.topics, RankTopics.localRanks),
  active: Game.playerUid === Game.rankingPlayerUid,
  activePlayerName: (Game.players.map[Game.rankingPlayerUid] || {}).name,
  state: Game.state,
  showDialog: RankTopics.showDialog
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
    uploadScore
  }
)(requireGame(RankTopicsContainer));
