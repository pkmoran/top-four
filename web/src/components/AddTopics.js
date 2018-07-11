import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import _ from 'lodash';
import requireGame from './requireGame';
import { addTopic, topicChanged, getTopics } from '../actions';

import './styles/AddTopics.css';

class AddTopicsComponent extends Component {
  constructor(props) {
    super(props);

    this.topicChanged = this.topicChanged.bind(this);
    this.renderTopics = this.renderTopics.bind(this);
  }

  componentDidMount() {
    this.props.getTopics();
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

const mapStateToProps = ({ AddTopics }) => {
  const {
    topic,
    topics
  } = AddTopics;

  return {
    topic,
    topics: _.map(topics, (val, uid) => ({ ...val, uid }))
  };
};

export default connect(
  mapStateToProps,
  {
    addTopic,
    topicChanged,
    getTopics
  }
)(requireGame(AddTopicsComponent));
