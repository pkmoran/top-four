import {
  JOIN_GAME_ERROR,
  GAME_ID_CHANGED,
  STARTING_GAME,
  STARTED_GAME,
  START_GAME_ERROR,
  NAME_CHANGED
} from '../actions/types';

export const INITIAL_STATE = {
  error: '',
  gameId: '',
  gameUid: '',
  loading: false,
  name: '',
  startGameEnabled: false,
  joinGameEnabled: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
        joinGameEnabled: action.payload.length === 2 && !!state.name,
        error: ''
      };
    case NAME_CHANGED:
      return {
        ...state,
        name: action.payload,
        startGameEnabled: !!action.payload,
        joinGameEnabled: !!action.payload && state.gameId.length === 2,
        error: ''
      };
    default:
      return state;
  }
};
