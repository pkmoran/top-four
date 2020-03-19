import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Button, TextField } from '@material-ui/core';

import compose from 'utilities/compose';
import { topicsToCount, topicsToPlayerTopics } from 'utilities/state_mapping';
import { withAction, withState } from 'state/game';
import { addTopic } from 'actions/game';

import Logo from 'components/shared/logo';
import Topic from 'components/add_topics/topic';

const AddTopics = ({ addTopic, numTopics = 0, playerTopics }) => {
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
        <h2>Add Topics</h2>
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
          <p name="numTopics">Total Topics: {numTopics}</p>
          <Button variant="contained" color="primary">
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
const withTopicsState = withState('game.topics', 'numTopics', topicsToCount);
const withPlayerTopicsState = withState(
  null,
  'playerTopics',
  topicsToPlayerTopics
);

const wrappers = compose(
  withAddTopicAction,
  withTopicsState,
  withPlayerTopicsState
);

export { AddTopics };
export default wrappers(AddTopics);
