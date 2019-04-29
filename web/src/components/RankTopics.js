import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Button from '@material-ui/core/Button';

import requireGame from './requireGame';
import GameId from './GameId';
import DraggableTopics from './DraggableTopics';
import ChoiceDialog from './ChoiceDialog';

import { updateMyRanks, showLockInDialog, hideLockInDialog, lockIn, endRound, roundEnded, uploadScore } from '../actions';

import './styles/RankTopics.css';

class RankTopicsComponent extends Component {
  constructor(props) {
    super(props);

    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidUpdate(previousProps) {
    if (previousProps.state === 'ranking' && this.props.state === 'ranked' && !this.props.active) {
      console.log('uploading score');
      this.props.uploadScore(this.props.topics);
    }

    if (previousProps.state === 'ranked' && this.props.state === '') {
      console.log('ending round');
      this.props.roundEnded(this.props.history);
    }
  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    this.props.updateMyRanks(this.props.topics, result.source.index, result.destination.index);
  }

  headerText() {
    if (this.props.active) {
      return 'Let\'s Rank!';
    }

    return 'Let\'s Guess!';
  }

  descriptionText() {
    if (this.props.active) {
      return 'Put the following topics in order from best to worst';
    }

    return `How would ${this.props.activePlayerName} rank the following topics?`;
  }

  renderActionButton() {
    if (this.props.active) {
      if (this.props.state === 'ranking') {
        return (
          <Button onClick={this.props.showLockInDialog}>Lock In!</Button>
        );
      }

      return (
        <Button onClick={this.props.endRound}>End Round!</Button>
      )
    }
  }

  render() {
    return (
      <div className="RankTopics">
        <GameId gameId={this.props.gameId}/>
        <h1>{this.headerText()}</h1>

        <span>{this.descriptionText()}</span>

        <div className="RankTopicsTopics">
          <DraggableTopics state={this.props.state} topics={this.props.topics} onDragEnd={this.onDragEnd} />
        </div>

        {this.renderActionButton()}

        <ChoiceDialog
          open={this.props.showDialog}
          titleText="Lock in your ranking?"
          contentText="Is the group done guessing your ranks?"
          choiceOneText="Yep!"
          onChoiceOne={this.props.lockIn}
          choiceTwoText="Nope!"
          onChoiceTwo={this.props.hideLockInDialogDialog}
          onClose={this.props.hideLockInDialog}
        />
      </div>
    );
  }
}

export const getTopics = (topics, optionalLocalRanks) => {
  // get all 'active' or 'ranked' topics, and map them to an array
  const activeTopics = _.map(_.pickBy(topics, topic => topic.status === 'active' || topic.status === 'ranked'), (topic, uid) => ({ ...topic, uid }));

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
  topics: getTopics(Game.topics, RankTopics.localRanks),
  active: Game.playerUid === (Game.games[Game.gameUid] || {}).rankingPlayerUid,
  activePlayerName: (Game.players[(Game.games[Game.gameUid] || {}).rankingPlayerUid] || {}).name,
  state: (Game.games[Game.gameUid] || {}).state,
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
)(requireGame(RankTopicsComponent));
