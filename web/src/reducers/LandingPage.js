import { WRITE_OUR_OWN_UID } from '../constants';

import {
  JOIN_GAME_ERROR,
  GAME_ID_CHANGED,
  STARTING_GAME,
  STARTED_GAME,
  START_GAME_ERROR,
  NAME_CHANGED,
  JOINING_GAME,
  TEAM_NUMBER_CHANGED,
  SHOW_START_GAME_DIALOG,
  LOADING_TOPIC_PACKS,
  START_GAME_STEP,
  TOPIC_PACK_CHANGED
} from '../actions/types';

export const INITIAL_STATE = {
  error: '',
  gameId: '',
  gameUid: '',
  loading: false,
  name: '',
  joinEnabled: false,
  showDialog: false,
  numberOfTeams: 2,
  startGameStep: 'yourName',
  topicPackUid: WRITE_OUR_OWN_UID
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STARTING_GAME:
      return { ...state, loading: true, showDialog: false };
    case JOINING_GAME:
      return { ...state, loading: true };
    case STARTED_GAME:
      return INITIAL_STATE;
    case START_GAME_ERROR:
      return { ...state, loading: false, error: action.payload };
    case JOIN_GAME_ERROR:
      return { ...state, loading: false, gameId: '', error: action.payload };
    case GAME_ID_CHANGED:
      return {
        ...state,
        gameId: action.payload.toUpperCase(),
        joinEnabled: action.payload.length === 2,
        error: ''
      };
    case NAME_CHANGED:
      return {
        ...state,
        name: action.payload,
        error: ''
      };
    case TEAM_NUMBER_CHANGED:
      return {
        ...state,
        numberOfTeams: action.payload
      }
    case SHOW_START_GAME_DIALOG:
      return {
        ...state,
        showDialog: action.payload,
        startGameStep: action.payload ? INITIAL_STATE.startGameStep : state.startGameStep,
        numberOfTeams: action.payload ? INITIAL_STATE.numberOfTeams : state.numberOfTeams,
        topicPackUid: action.payload ? INITIAL_STATE.topicPackUid : state.topicPackUid
      }
    case LOADING_TOPIC_PACKS:
      return {
        ...state,
        loading: action.payload
      }
    case START_GAME_STEP:
      return {
        ...state,
        startGameStep: action.payload
      }
    case TOPIC_PACK_CHANGED:
      return {
        ...state,
        topicPackUid: action.payload
      }
    default:
      return state;
  }
};
