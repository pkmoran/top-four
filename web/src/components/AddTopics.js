import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import _ from 'lodash';

import AddTopicRow from './AddTopicRow';
import requireGame from './requireGame';
import GameId from './GameId';
import { addTopic, topicChanged, deleteTopic, done } from '../actions';

import './styles/AddTopics.css';

class AddTopicsComponent extends Component {
  constructor(props) {
    super(props);

    this.topicChanged = this.topicChanged.bind(this);
  }

  topicChanged(event) {
    this.props.topicChanged(event.target.value);
  }

  renderTopics() {
    return this.props.playerTopics.map(t => (
      <AddTopicRow
        key={t.uid}
        topic={t.topic}
        onDelete={() => this.props.deleteTopic(t.uid)}
      />));
  }

  render() {
    return (
      <div className="AddTopics">
        <GameId />
        <h1>Add Topics!</h1>
        <div>
          <TextField
            onChange={this.topicChanged}
            value={this.props.topic}
            id="topic"
            label="Topic"
            placeholder="e.g. Road trips"
          />
          <Button
            disabled={!this.props.addTopicEnabled}
            onClick={() => this.props.addTopic(this.props.topic)}
          >
            Add
          </Button>
        </div>

        <div className="TopicsContainer">
          {this.renderTopics()}
        </div>

        <Button
          disabled={this.props.doneDisabled}
          onClick={() => this.props.done(this.props.history)}
        >
          Done!
        </Button>

        <div className="TopicCountsContainer">
          <div className="TopicCountContainer">
            <span>Your Topics</span>
            <span>{this.props.playerTopics.length}</span>
          </div>

          <div className="TopicCountContainer">
            <span>Total # of Topics</span>
            <span>{this.props.allTopicsCount}</span>
          </div>
        </div>
      </div>
    );
  }
}

const playerTopics = ({ topics, playerUid }) => {
  const mapped = _.map(topics, (val, uid) => ({ ...val, uid }));
  return _.filter(mapped, t => t.playerUid === playerUid);
};

const mapStateToProps = ({ AddTopics, Game }) => ({
  topic: AddTopics.topic,
  playerTopics: playerTopics(Game),
  allTopicsCount: Object.keys(Game.topics || {}).length,
  addTopicEnabled: AddTopics.addTopicEnabled,
  doneDisabled: Object.keys(Game.topics || {}).length < 4
});

export default connect(
  mapStateToProps,
  {
    addTopic,
    topicChanged,
    deleteTopic,
    done
  }
)(requireGame(AddTopicsComponent));
