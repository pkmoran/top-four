import { addTopicService, deleteTopicService } from '../services/AddTopics';
import { homescreenRoute } from '../services/navigation';

import { TOPIC_CHANGED, ADDED_TOPIC } from './types';

export const addTopic = topic => (dispatch, getState) => {
  const { playerUid, gameUid } = getState().Game;

  dispatch({
    type: ADDED_TOPIC
  });

  addTopicService(topic, playerUid, gameUid);
};

export const topicChanged = topic => ({
  type: TOPIC_CHANGED,
  payload: topic
});

export const deleteTopic = topicUid => (dispatch, getState) => {
  deleteTopicService(topicUid, getState().Game.gameUid);
};

export const done = history => (dispatch, getState) => {
  const { gameId } = getState().Game;
  history.push(homescreenRoute(gameId));
};
