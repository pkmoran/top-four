import {
  ADD_TOPIC,
  TOPIC_CHANGED,
  CLEAR_TOPIC
} from './types';

export const addTopic = topic => (dispatch, getState) => {
  const { topics } = getState().AddTopics;

  if (topics.includes(topic)) {
    dispatch({
      type: CLEAR_TOPIC
    });
    return;
  }

  dispatch({
    type: ADD_TOPIC,
    payload: topic
  });
};

export const topicChanged = topic => ({
  type: TOPIC_CHANGED,
  payload: topic
});
