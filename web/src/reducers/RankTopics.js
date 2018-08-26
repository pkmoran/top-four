import { UPDATE_MY_RANKS } from '../actions/types';

const INITIAL_STATE = {
  localRanks: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_MY_RANKS:
      return { ...state, localRanks: action.payload };
    default:
      return state;
  }
};
