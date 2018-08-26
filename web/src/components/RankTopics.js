import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import requireGame from './requireGame';
import GameId from './GameId';
import DraggableTopics from './DraggableTopics';
import { updateMyRanks } from '../actions';

import './styles/RankTopics.css';

class RankTopicsComponent extends Component {
  constructor(props) {
    super(props);

    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    this.props.updateMyRanks(this.props.topics, result.source.index, result.destination.index);
  }

  render() {
    return (
      <div className="RankTopics">
        <GameId />
        <h1>Let&apos;s Rank!</h1>

        <span>Put the following topics in order from best to worst</span>

        <div className="RankTopicsTopics">
          <DraggableTopics topics={this.props.topics} onDragEnd={this.onDragEnd} />
        </div>
      </div>
    );
  }
}

export const getTopics = (topics, optionalLocalRanks) => {
  let localRanks;

  if (!optionalLocalRanks) {
    localRanks = _.reduce(
      topics,
      (result, value, index) => ({
        ...result,
        [value.uid]: index
      }),
      {}
    );
  } else {
    localRanks = optionalLocalRanks;
  }

  const activeTopics = _.pickBy(topics, topic => topic.status === 'active');
  return _.sortBy(_.map(activeTopics, (topic, uid) => ({ ...topic, uid })), [
    topic => localRanks[topic.uid]
  ]);
};

const mapStateToProps = ({ Game, RankTopics }) => ({
  topics: getTopics(Game.topics, RankTopics.localRanks)
});

export default connect(
  mapStateToProps,
  { updateMyRanks }
)(requireGame(RankTopicsComponent));
