import _ from 'lodash';
import { updateTopicsService } from '../services/Game';

import { SHOW_START_ROUND_DIALOG, START_ROUND } from './types';

export const showStartRoundDialog = () => ({
  type: SHOW_START_ROUND_DIALOG,
  payload: true
});

export const hideStartRoundDialog = () => ({
  type: SHOW_START_ROUND_DIALOG,
  payload: false
});

export const randTopics = (topics) => {
  const availableTopics = _.pickBy(topics, topic => topic.status === 'available');
  const randTopicIds = _.sampleSize(Object.keys(availableTopics), 4);
  return _.pick(availableTopics, randTopicIds);
};

export const startRound = () => (dispatch, getState) => {
  const { gameUid, topics } = getState().Game;
  const topicsToUpdate = randTopics(topics);

  _.forEach(topicsToUpdate, (topic) => {
    topic.status = 'active'; // eslint-disable-line no-param-reassign
  });

  updateTopicsService(topicsToUpdate, gameUid, () => {
    dispatch({
      type: START_ROUND
    });
  });
};
