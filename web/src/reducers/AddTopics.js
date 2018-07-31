import {
  TOPIC_CHANGED, ADDED_TOPIC
} from '../actions/types';

export const INITIAL_STATE = {
  topic: '',
  addTopicEnabled: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOPIC_CHANGED:
      return { ...state, topic: action.payload, addTopicEnabled: action.payload.length > 0 };
    case ADDED_TOPIC:
      return { ...state, topic: '', addTopicEnabled: false };
    default:
      return state;
  }
};
