import {
  ADD_TOPIC, TOPIC_CHANGED, CLEAR_TOPIC
} from '../actions/types';

export const INITIAL_STATE = {
  topic: '',
  topics: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLEAR_TOPIC:
      return { ...state, topic: '' };
    case TOPIC_CHANGED:
      return { ...state, topic: action.payload };
    case ADD_TOPIC:
      return {
        ...state,
        topic: '',
        topics: [...state.topics, action.payload]
      };
    default:
      return state;
  }
};
