import _ from 'lodash';

import {
  STARTED_GAME,
  NAME_CHANGED,
  NEW_GAMES,
  NEW_TEAMS,
  ADDED_PLAYER,
  NEW_TOPICS,
  NEW_PLAYERS
} from '../actions/types';

export const INITIAL_STATE = {
  gameId: '',
  gameUid: '',
  name: '',
  playerUid: '',
  rankingPlayerUid: '',
  games: [],
  teams: [],
  players: [],
  topics: []
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
    case ADDED_PLAYER:
      return { ...state, playerUid: action.payload };
    case NEW_TEAMS:
      return { ...state, teams: action.payload };
    case NEW_PLAYERS:
      return { ...state, players: action.payload };
    case NEW_TOPICS:
      return { ...state, topics: action.payload };
    default:
      return state;
  }
};
