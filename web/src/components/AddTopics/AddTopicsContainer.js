import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import AddTopics from './AddTopics';
import requireGame from '../requireGame';

import { addTopic, topicChanged, deleteTopic, done } from '../../actions';

class AddTopicsContainer extends Component {
  constructor(props) {
    super(props);

    this.topicChanged = this.topicChanged.bind(this);
    this.addTopic = this.addTopic.bind(this);
    this.done = this.done.bind(this);
  }

  topicChanged(event) {
    this.props.topicChanged(event.target.value);
  }

  addTopic() {
    this.props.addTopic(this.props.topic);
  }

  done() {
    this.props.done(this.props.history);
  }

  render() {
    const {
      topic,
      playerTopics,
      allTopicsCount,
      addTopicEnabled,
      doneDisabled,
      deleteTopic,
      gameId
    } = this.props;

    const {
      topicChanged,
      addTopic,
      done
    } = this;

    return (
      <AddTopics 
        { ... {
          gameId,
          topic,
          playerTopics,
          allTopicsCount,
          addTopicEnabled,
          doneDisabled,
          addTopic,
          topicChanged,
          deleteTopic,
          done
        }}
      />
    )
  }
}

export const playerTopics = ({ topics, playerUid }) => {
  return _.filter(topics.array, t => t.playerUid === playerUid);
};

const mapStateToProps = ({ AddTopics, Game }) => ({
  gameId: Game.gameId,
  topic: AddTopics.topic,
  playerTopics: playerTopics(Game),
  allTopicsCount: Game.topics.array.length,
  addTopicEnabled: AddTopics.addTopicEnabled,
  doneDisabled: Game.topics.array.length < 4
});

export default connect(
  mapStateToProps,
  {
    addTopic,
    topicChanged,
    deleteTopic,
    done
  }
)(requireGame(AddTopicsContainer));