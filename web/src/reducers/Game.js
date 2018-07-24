import {
  STARTED_GAME,
  NAME_CHANGED,
  NEW_GAMES,
  NEW_TEAMS,
  ADDED_PLAYER,
  NEW_TEAM_PLAYERS
} from '../actions/types';

export const INITIAL_STATE = {
  gameId: '',
  gameUid: '',
  name: '',
  playerUid: '',
  games: [],
  teams: [],
  teamPlayers: []
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
    case NEW_TEAM_PLAYERS:
      return { ...state, teamPlayers: action.payload };
    default:
      return state;
  }
};
