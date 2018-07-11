import {
  STARTED_GAME,
  NAME_CHANGED,
  NEW_GAMES,
  NEW_TEAMS
} from '../actions/types';

export const INITIAL_STATE = {
  gameId: '',
  gameUid: '',
  name: '',
  games: [],
  teams: []
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
    case NEW_TEAMS:
      return { ...state, teams: action.payload };
    default:
      return state;
  }
};
