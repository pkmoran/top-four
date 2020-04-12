import { route } from 'preact-router';

import {
  startGameService,
  getGameUidService,
  addPlayerService,
  getTopicPacksService,
  subscribeToGameUpdatesService,
  joinTeamService,
  addTopicService
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
  route(`${gameId}/share`, true);
};

const joinGame = async ({ name, gameId }, { dispatch }) => {
  const game = await getGameUidService(gameId).catch(
    tagLogger('getGameUidService failed')
  );

  if (!game || !game.gameUid) {
    return Promise.reject('cannot get game object');
  }

  const { gameUid } = game;

  const playerUid = await addPlayer({ gameUid, name });

  if (!playerUid) {
    return Promise.reject('cannot add player');
  }

  dispatch({
    type: STARTED_GAME,
    payload: { gameId, gameUid, playerUid, name }
  });

  subscribeToGameUpdates(gameUid, { dispatch });
  route(`${gameId}/teams`, true);
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
    dispatch({
      type: GAME_UPDATE,
      payload: game
    });
  });
};

const addTopic = (topic, { state: { gameUid, playerUid } }) => {
  addTopicService({ topic, playerUid, gameUid });
};

export {
  startGame,
  joinGame,
  getTopicPacks,
  addPlayer,
  subscribeToGameUpdates,
  joinTeam,
  addTopic
};
