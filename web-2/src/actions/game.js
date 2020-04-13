import sampleSize from 'lodash/sampleSize';

import {
  toRoot,
  toShare,
  toTeams,
  toAddTopics,
  toGame
} from 'utilities/router';

import {
  startGameService,
  getGameUidService,
  addPlayerService,
  getTopicPacksService,
  subscribeToGameUpdatesService,
  joinTeamService,
  addTopicService,
  updateGameService
} from 'services/game';

import { TOPIC_PACKS, STARTED_GAME, GAME_UPDATE } from 'actions/types';
import { TEAMS, WRITE_OUR_OWN_UID } from 'utilities/constants';
import { tagLogger } from 'utilities/logging';

const startGame = async ({ name, gameMode, topicPackUid }, { dispatch }) => {
  const numberOfTeams = gameMode === TEAMS ? 2 : 0;

  const data = await startGameService({
    numberOfTeams,
    topicPackUid: topicPackUid !== WRITE_OUR_OWN_UID ? topicPackUid : null
  }).catch(tagLogger('startGameService failed'));

  if (!data || !data.gameId || !data.gameUid) {
    return Promise.reject('cannot start game');
  }

  const { gameId, gameUid } = data;

  const playerUid = await addPlayer({ gameUid, name });

  if (!playerUid) {
    return Promise.reject('cannot add player');
  }

  dispatch({
    type: STARTED_GAME,
    payload: { gameId, gameUid, playerUid, name }
  });

  subscribeToGameUpdates(gameUid, { dispatch });
  toShare(gameId)();
};

const joinGame = async ({ name, gameId }, { dispatch }) => {
  const game = await getGameUidService(gameId).catch(
    tagLogger('getGameUidService failed')
  );

  if (!game || !game.gameUid) {
    return Promise.reject('cannot get game object');
  }

  const { gameUid, noTeams, topicPack } = game;

  const playerUid = await addPlayer({ gameUid, name });

  if (!playerUid) {
    return Promise.reject('cannot add player');
  }

  dispatch({
    type: STARTED_GAME,
    payload: { gameId, gameUid, playerUid, name }
  });

  subscribeToGameUpdates(gameUid, { dispatch });

  let route;
  if (!noTeams) {
    route = toTeams(gameId);
  } else if (!topicPack) {
    route = toAddTopics(gameId);
  } else {
    route = toGame(gameId);
  }

  route();
};

const addPlayer = async ({ gameUid, name }) => {
  const playerUid = await addPlayerService({ gameUid, name }).catch(
    tagLogger('addPlayerService failed')
  );

  return playerUid;
};

const joinTeam = async (teamUid, { state: { gameUid, playerUid } }) => {
  joinTeamService({ teamUid, playerUid, gameUid });
};

const getTopicPacks = async ({ state, dispatch }) => {
  if (state.topicPacks && state.topicPacks.length > 0) return;

  const topicPacks = await getTopicPacksService().catch(
    tagLogger('getTopicPacksService failed')
  );

  if (topicPacks) {
    dispatch({ type: TOPIC_PACKS, payload: topicPacks });
  }
};

const subscribeToGameUpdates = (gameUid, { dispatch }) => {
  subscribeToGameUpdatesService(gameUid, game => {
    if (game) {
      dispatch({
        type: GAME_UPDATE,
        payload: game
      });
    } else {
      toRoot()();
    }
  });
};

const addTopic = (topic, { state: { gameUid, playerUid } }) => {
  addTopicService({ topic, playerUid, gameUid });
};

const startRound = ({
  state: {
    playerUid,
    gameUid,
    game: { topics }
  }
}) => {
  const newTopics = { ...topics };

  sampleSize(
    Object.keys(topics)
      .map(uid => ({ uid, ...topics[uid] }))
      .filter(({ status }) => status === 'available'),
    4
  )
    .map(({ uid }) => uid)
    .forEach(uid => {
      newTopics[uid] = { ...topics[uid], status: 'active' };
    });

  const game = {
    rankingPlayerUid: playerUid,
    state: 'ranking',
    topics: newTopics
  };

  updateGameService(game, gameUid);
};

export {
  startGame,
  joinGame,
  getTopicPacks,
  addPlayer,
  subscribeToGameUpdates,
  joinTeam,
  addTopic,
  startRound
};
