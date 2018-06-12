import {
  JOIN_GAME_ERROR,
  GAME_ID_CHANGED,
  STARTING_GAME,
  STARTED_GAME,
  START_GAME_ERROR
} from '../actions/types';

export const INITIAL_STATE = {
  error: '',
  gameId: '',
  loading: false,
  azs: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STARTING_GAME:
      return { ...state, loading: true };
    case STARTED_GAME:
      return { ...state, azs: action.payload, loading: false };
    case START_GAME_ERROR:
      return { ...state, loading: false, error: action.payload };
    case GAME_ID_CHANGED:
      return { ...state, gameId: action.payload, error: '' };
    case JOIN_GAME_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
