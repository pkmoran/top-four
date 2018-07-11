import { addTopicService, getTopicsService } from '../services/AddTopics';

import {
  TOPIC_CHANGED,
  NEW_TOPICS
} from './types';

export const addTopic = topic => (dispatch, getState) => {
  addTopicService(topic, getState().Game.gameUid);
};

export const topicChanged = topic => ({
  type: TOPIC_CHANGED,
  payload: topic
});

export const getTopics = () => (dispatch, getState) => {
  getTopicsService(getState().Game.gameUid, (topics) => {
    dispatch({
      type: NEW_TOPICS,
      payload: topics
    });
  });
};
