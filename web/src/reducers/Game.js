import map from 'lodash/map';

import { WRITE_OUR_OWN_UID } from '../constants';

import {
  STARTED_GAME,
  NAME_CHANGED,
  ADDED_PLAYER,
  NEW_GAME_DATA,
  TOPIC_PACKS
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
  topics: {},
  topicPacks: []
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
        topicPack,
        teams,
        players,
        topics
      } = action.payload;

      return {
        ...state,
        gameId,
        rankingPlayerUid,
        topicPack,
        state: action.payload.state,
        teams: {
          map: { ...teams },
          array: map(teams, (team, uid) => ({ ...team, uid }))
        },
        topics: {
          map: { ...topics },
          array: map(topics, (topic, uid) => ({ ...topic, uid }))
        },
        players: {
          map: { ...players },
          array: map(players, (player, uid) => ({ ...player, uid }))
        }
      }
    case TOPIC_PACKS:
      const topicPacks = map(action.payload, (topicPack, uid) => ({ name: `${topicPack.name} (${Object.keys(topicPack.topics).length})`, uid }));
      topicPacks.unshift({ name: 'Write our own!', uid: WRITE_OUR_OWN_UID })

      return {
        ...state,
        topicPacks
      }
    default:
      return state;
  }
};
