import {
  STARTED_GAME,
  NAME_CHANGED,
  NEW_GAMES
} from '../actions/types';

export const INITIAL_STATE = {
  gameId: '',
  gameUid: '',
  name: '',
  games: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NEW_GAMES:
      return { ...state, games: action.payload };
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
