import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Button, TextField } from '@material-ui/core';

import compose from 'utilities/compose';
import {
  topicsToPlayerTopics,
  toAvailableAndRankingTopicsCount
} from 'utilities/state_mapping';
import { withAction, withState } from '@state';
import { addTopic } from '@actions';
import withRouter, { toGame } from 'utilities/router';

import Logo from 'components/shared/logo';
import Topic from 'components/add_topics/topic';

const AddTopics = ({
  addTopic,
  numTopics = 0,
  playerTopics,
  routes: [toGame],
  gameId
}) => {
  const [topic, setTopic] = useState('');

  const handleAddTopic = () => {
    addTopic(topic);
    setTopic('');
  };

  return (
    <div class="add-topics">
      <div class="add-topics__logo">
        <Logo size="small" />
      </div>
      <div class="add-topics__container">
        <div class="add-topics__header">
          <span class="add-topics__header--game-id">{gameId}</span>
          <h2 class="add-topics__header--title">Add Topics</h2>
        </div>
        <form
          class="add-topics__form"
          autoComplete="off"
          onSubmit={handleAddTopic}
        >
          <div class="add-topics__input">
            <TextField
              label="Trivial topic"
              value={topic}
              onInput={({ target: { value } }) => setTopic(value)}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddTopic}
            name="add"
            disabled={!topic}
          >
            Add
          </Button>
        </form>
        <div class="add-topics__topics">
          {playerTopics.map(topic => (
            <Topic topic={topic} />
          ))}
        </div>
        <div class="add-topics__footer">
          <span name="numTopics" class="add-topics__total-topics">
            Total Topics: {numTopics}
          </span>
          <Button
            variant="contained"
            color="primary"
            onClick={toGame}
            name="done"
            disabled={numTopics < 4}
          >
            Done!
          </Button>
        </div>
      </div>
    </div>
  );
};

// actions
const withAddTopicAction = withAction(addTopic, 'addTopic');

// state
const withTopicsState = withState(
  'game.topics',
  'numTopics',
  toAvailableAndRankingTopicsCount
);
const withPlayerTopicsState = withState(
  null,
  'playerTopics',
  topicsToPlayerTopics
);
const withGameIdState = withState('gameId');

// routes
const withRoutes = withRouter(toGame);

const wrappers = compose(
  withAddTopicAction,
  withTopicsState,
  withPlayerTopicsState,
  withGameIdState,
  withRoutes
);

export { AddTopics };
export default wrappers(AddTopics);
