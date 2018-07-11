import {
  JOIN_GAME_ERROR,
  GAME_ID_CHANGED,
  STARTING_GAME,
  STARTED_GAME,
  START_GAME_ERROR,
  NAME_CHANGED,
  SHOW_JOIN_GAME
} from '../actions/types';

export const INITIAL_STATE = {
  error: '',
  gameId: '',
  gameUid: '',
  loading: false,
  name: '',
  startGameEnabled: false,
  joinGameEnabled: false,
  joinEnabled: false,
  showJoinGame: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_JOIN_GAME:
      return { ...state, showJoinGame: true };
    case STARTING_GAME:
      return { ...state, loading: true };
    case STARTED_GAME:
      return INITIAL_STATE;
    case START_GAME_ERROR:
      return { ...state, loading: false, error: action.payload };
    case JOIN_GAME_ERROR:
      return { ...state, error: action.payload };
    case GAME_ID_CHANGED:
      return {
        ...state,
        gameId: action.payload,
        joinEnabled: action.payload.length === 2,
        error: ''
      };
    case NAME_CHANGED:
      return {
        ...state,
        name: action.payload,
        startGameEnabled: !!action.payload,
        joinGameEnabled: !!action.payload,
        error: ''
      };
    default:
      return state;
  }
};
