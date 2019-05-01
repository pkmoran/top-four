import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import AddTopicRow from './AddTopicRow';
import GameId from '../GameId';

import './styles/AddTopics.css';

class AddTopicsComponent extends Component {
  renderTopics() {
    if (this.props.playerTopics) {
      return this.props.playerTopics.map(t => (
        <AddTopicRow
          key={t.uid}
          topic={t.topic}
          onDelete={() => this.props.deleteTopic(t.uid)}
        />));
    }
  }

  render() {
    return (
      <div className="AddTopics">
        <GameId gameId={this.props.gameId} />
        <h1>Add Topics!</h1>
        <div>
          <TextField
            onChange={this.props.topicChanged}
            value={this.props.topic}
            id="topic"
            label="Topic"
            placeholder="e.g. Road trips"
          />
          <Button
            disabled={!this.props.addTopicEnabled}
            onClick={() => this.props.addTopic()}
          >
            Add
          </Button>
        </div>

        <div className="TopicsContainer">
          {this.renderTopics()}
        </div>

        <div className="TopicCountsContainer">
          <div className="TopicCountContainer">
            <span>Your Topics</span>
            <span>{(this.props.playerTopics || []).length}</span>
          </div>

          <div className="TopicCountContainer">
            <span>Total # of Topics</span>
            <span>{this.props.allTopicsCount}</span>
          </div>
        </div>

        <div className="AddTopicsDoneButton">
          <Button
            variant="contained"
            disabled={this.props.doneDisabled}
            onClick={() => this.props.done()}
          >
            Done!
          </Button>
        </div>
      </div>
    );
  }
}

export default AddTopicsComponent;
