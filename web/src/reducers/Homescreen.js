import { SHOW_START_ROUND_DIALOG } from '../actions/types';

export const INITIAL_STATE = {
  showDialog: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_START_ROUND_DIALOG:
      return { ...state, showDialog: action.payload };
    default:
      return state;
  }
};
