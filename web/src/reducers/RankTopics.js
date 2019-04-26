import { UPDATE_MY_RANKS, SHOW_LOCK_IN_DIALOG, RESET_LOCAL_RANKING } from '../actions/types';

const INITIAL_STATE = {
  localRanks: {},
  showDialog: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_MY_RANKS:
      return { ...state, localRanks: action.payload };
    case SHOW_LOCK_IN_DIALOG:
      return { ...state, showDialog: action.payload };
    case RESET_LOCAL_RANKING:
      return INITIAL_STATE;
    default:
      return state;
  }
};
