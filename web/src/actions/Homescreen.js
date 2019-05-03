import _ from 'lodash';
import { updateGameService } from '../services/Game';

import { SHOW_START_ROUND_DIALOG } from './types';

export const showStartRoundDialog = () => ({
  type: SHOW_START_ROUND_DIALOG,
  payload: true
});

export const hideStartRoundDialog = () => ({
  type: SHOW_START_ROUND_DIALOG,
  payload: false
});

export const randTopicIds = (topics) => {
  const availableTopics = _.pickBy(topics, topic => topic.status === 'available');
  return _.sampleSize(Object.keys(availableTopics), 4);
};

export const startRound = () => (dispatch, getState) => {
  dispatch(hideStartRoundDialog());

  const { gameUid, topics, playerUid } = getState().Game;

  _.forEach(randTopicIds(topics.map), topicId => {
    topics.map[topicId].status = 'active';
  });

  const game = {
    rankingPlayerUid: playerUid,
    state: 'ranking',
    topics: topics.map
  };

  updateGameService(game, gameUid);
};

export const startRanking = history => (dispatch, getState) => {
  const { gameId } = getState().Game;
  history.push(`/${gameId}/rankTopics`);
};
