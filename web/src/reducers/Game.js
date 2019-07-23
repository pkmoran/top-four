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
  rankingTeamUid: '',
  state: '',
  teams: { map: {}, array: [] },
  players: { map: {}, array: [] },
  topics: { map: {}, array: [] },
  topicPacks: [],
  noTeams: false,
  hasRanked: false
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
        rankingTeamUid,
        topicPack,
        teams,
        players,
        topics,
        noTeams,
        hasRanked
      } = action.payload;

      return {
        ...state,
        gameId,
        rankingPlayerUid,
        rankingTeamUid,
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
        },
        noTeams,
        hasRanked: hasRanked || false
      };
    case TOPIC_PACKS:
      const topicPacks = map(action.payload, (topicPack, uid) => ({
        rawName: topicPack.name,
        name: `${topicPack.name} (${Object.keys(topicPack.topics).length})`,
        uid
      }));
      topicPacks.unshift({
        rawName: 'Write our own!',
        name: 'Write our own!',
        uid: WRITE_OUR_OWN_UID
      });

      return {
        ...state,
        topicPacks
      };
    default:
      return state;
  }
};
