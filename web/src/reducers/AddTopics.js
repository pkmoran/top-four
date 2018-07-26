import {
  TOPIC_CHANGED, ADDED_TOPIC
} from '../actions/types';

export const INITIAL_STATE = {
  topic: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOPIC_CHANGED:
      return { ...state, topic: action.payload };
    case ADDED_TOPIC:
      return { ...state, topic: '' };
    default:
      return state;
  }
};
