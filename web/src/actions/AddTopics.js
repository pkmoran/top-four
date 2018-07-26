import { addTopicService } from '../services/AddTopics';

import {
  TOPIC_CHANGED, ADDED_TOPIC
} from './types';

export const addTopic = topic => (dispatch, getState) => {
  dispatch({
    type: ADDED_TOPIC
  });

  addTopicService(topic, getState().Game.gameUid);
};

export const topicChanged = topic => ({
  type: TOPIC_CHANGED,
  payload: topic
});
