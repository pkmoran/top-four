import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import _ from 'lodash';
import requireGame from './requireGame';
import GameId from './GameId';
import { addTopic, topicChanged } from '../actions';

import './styles/AddTopics.css';

class AddTopicsComponent extends Component {
  constructor(props) {
    super(props);

    this.topicChanged = this.topicChanged.bind(this);
    this.renderTopics = this.renderTopics.bind(this);
  }

  topicChanged(event) {
    this.props.topicChanged(event.target.value);
  }

  renderTopics() {
    return this.props.topics.map(t => <li key={t.uid}>{t.topic}</li>);
  }

  render() {
    return (
      <div className="AddTopics">
        <GameId />
        <h1>Add Topics</h1>
        <div>
          <TextField
            onChange={this.topicChanged}
            value={this.props.topic}
            id="topic"
            label="Topic"
            placeholder="e.g. Road trips"
          />
          <Button onClick={() => this.props.addTopic(this.props.topic)}>Add</Button>
        </div>
        <ul>
          {this.renderTopics()}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ AddTopics, Game }) => ({
  topic: AddTopics.topic,
  topics: _.map(Game.topics, (val, uid) => ({ ...val, uid }))
});

export default connect(
  mapStateToProps,
  {
    addTopic,
    topicChanged
  }
)(requireGame(AddTopicsComponent));
