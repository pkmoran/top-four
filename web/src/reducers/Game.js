import _ from 'lodash';

import {
  STARTED_GAME,
  NAME_CHANGED,
  ADDED_PLAYER,
  NEW_GAME_DATA
} from '../actions/types';

export const INITIAL_STATE = {
  gameId: '',
  gameUid: '',
  name: '',
  playerUid: '',
  rankingPlayerUid: '',
  state: '',
  teams: {},
  players: {},
  topics: {}
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
    case ADDED_PLAYER:
      return { ...state, playerUid: action.payload };
    case NEW_GAME_DATA:
      const {
        gameId,
        rankingPlayerUid,
        teams,
        players,
        topics
      } = action.payload;

      return {
        ...state,
        gameId,
        rankingPlayerUid,
        state: action.payload.state,
        teams: {
          map: { ...teams },
          array: _.map(teams, (team, uid) => ({ ...team, uid }))
        },
        topics: {
          map: { ...topics },
          array: _.map(topics, (topic, uid) => ({ ...topic, uid }))
        },
        players: {
          map: { ...players },
          array: _.map(players, (player, uid) => ({ ...player, uid }))
        }
      }
    default:
      return state;
  }
};
