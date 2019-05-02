import {
  UPDATE_MY_RANKS,
  SHOW_LOCK_IN_DIALOG,
  RESET_LOCAL_RANKING,
  LOCKED_IN,
  SHOW_REVEAL_DIALOG,
  HIDE_REVEAL_DIALOG
} from '../actions/types';

const INITIAL_STATE = {
  localRanks: {},
  showDialog: false,
  lockedIn: false,
  showRevealDialog: false,
  pendingRevealAction: () => { }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_MY_RANKS:
      return { ...state, localRanks: action.payload };
    case SHOW_LOCK_IN_DIALOG:
      return { ...state, showDialog: action.payload };
    case RESET_LOCAL_RANKING:
      return INITIAL_STATE;
    case LOCKED_IN:
      return { ...state, lockedIn: true };
    case SHOW_REVEAL_DIALOG:
      return { ...state, showRevealDialog: true, pendingRevealAction: action.payload };
    case HIDE_REVEAL_DIALOG:
      return {
        ...state,
        showRevealDialog: false,
        pendingRevealAction: INITIAL_STATE.pendingRevealAction
      }
    default:
      return state;
  }
};
