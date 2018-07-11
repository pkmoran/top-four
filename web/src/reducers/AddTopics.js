import {
  TOPIC_CHANGED, NEW_TOPICS
} from '../actions/types';

export const INITIAL_STATE = {
  topic: '',
  topics: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOPIC_CHANGED:
      return { ...state, topic: action.payload };
    case NEW_TOPICS:
      return {
        ...state,
        topic: '',
        topics: action.payload
      };
    default:
      return state;
  }
};
