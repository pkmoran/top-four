import {
  STARTED_GAME,
  NAME_CHANGED
} from '../actions/types';

export const INITIAL_STATE = {
  gameId: '',
  gameUid: '',
  name: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NAME_CHANGED:
      return { ...state, name: action.payload };
    case STARTED_GAME:
      return {
        ...state,
        gameId: action.payload.gameId,
        gameUid: action.payload.gameUid
      };
    default:
      return state;
  }
};
