import { h } from 'preact';
import { useCallback, useEffect, useState } from 'preact/hooks';
import { Button, TextField } from '@material-ui/core';
import sampleSize from 'lodash/sampleSize';

import compose from 'utilities/compose';
import {
  topicsToPlayerTopics,
  toAvailableAndRankingTopicsCount
} from 'utilities/state_mapping';
import { withAction, withState } from '@state';
import { addTopic, getTopicPacks } from '@actions';
import withRouter, { toGame } from 'utilities/router';

import Coachmark from 'components/shared/coachmark';
import Logo from 'components/shared/logo';
import Topic from 'components/add_topics/topic';

const AddTopics = ({
  addTopic,
  numTopics = 0,
  playerTopics,
  routes: [toGame],
  gameId,
  topicExample,
  onTopicAdded
}) => {
  const [topic, setTopic] = useState('');
  const numRounds = Math.floor(numTopics / 4);

  const handleAddTopic = () => {
    addTopic(topic);
    setTopic('');
    onTopicAdded && onTopicAdded();
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
          <div class="add-topics__header--coachmark">
            <Coachmark eventLabel="add_topics">
              Topics are people, places and things that you’ll be asked to rank
              throughout the game. Good topics are things that are trivial yet
              polarizing. Here are a few examples of potential topics:
              <ul>
                <li>Las Vegas</li>
                <li>Dave Matthews Band</li>
                <li>The Bachelor</li>
                <li>Going to the movies alone</li>
              </ul>
              Here are some things to avoid:
              <ul>
                <li>
                  "Either/ors" like "cats or dogs". That’s an entirely different
                  game. Just enter "cats!" Better yet, enter "Cats! The Musical"
                </li>
                <li>
                  Broad categories like "airlines" or "music". It’s fun to get
                  specific. Instead, try "Delta Airlines" or "Jazz"
                </li>
              </ul>
            </Coachmark>
          </div>
        </div>
        <form
          class="add-topics__form"
          autoComplete="off"
          onSubmit={handleAddTopic}
        >
          <div class="add-topics__input">
            <TextField
              label="Trivial topic"
              placeholder={topicExample ? `e.g. ${topicExample}` : null}
              value={topic}
              onInput={({ target: { value } }) => setTopic(value)}
              InputLabelProps={{
                shrink: true
              }}
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
            {numRounds === 0
              ? 'Not enough topics'
              : `Enough topics for ${numRounds} turn${
                  numRounds > 1 ? 's' : ''
                }`}
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
const withGetTopicPacksAction = withAction(getTopicPacks, 'getTopicPacks');

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
const withTopicPacksState = withState('topicPacks');

// routes
const withRoutes = withRouter(toGame);

const randomTopicFromTopicPacks = topicPacks => {
  if (topicPacks) {
    const randomTopicsPack = topicPacks.find(
      ({ isRandomPack }) => isRandomPack
    );

    if (randomTopicsPack) {
      const randomTopics = Object.keys(randomTopicsPack.topics).map(
        topicUid => randomTopicsPack.topics[topicUid].topic
      );

      const randomTopic = sampleSize(randomTopics, 1);
      return randomTopic.length < 20
        ? randomTopic
        : randomTopicFromTopicPacks(topicPacks);
    }
  }
};

const withTopicExampleProp = WrappedComponent => {
  return props => {
    const { topicPacks, getTopicPacks } = props;
    const [randomTopic, setRandomTopic] = useState(
      randomTopicFromTopicPacks(topicPacks)
    );

    useEffect(() => {
      getTopicPacks();
    }, []);

    useEffect(() => {
      setRandomTopic(randomTopicFromTopicPacks(topicPacks));
    }, [topicPacks]);

    const onTopicAdded = useCallback(() => {
      setRandomTopic(randomTopicFromTopicPacks(topicPacks));
    }, [setRandomTopic, topicPacks]);

    return (
      <WrappedComponent
        {...props}
        onTopicAdded={onTopicAdded}
        topicExample={randomTopic}
      />
    );
  };
};

const wrappers = compose(
  withAddTopicAction,
  withGetTopicPacksAction,
  withTopicsState,
  withPlayerTopicsState,
  withGameIdState,
  withTopicPacksState,
  withRoutes,
  withTopicExampleProp
);

export { AddTopics };
export default wrappers(AddTopics);
