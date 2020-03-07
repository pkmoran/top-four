import { route } from 'preact-router';

import {
  startGameService,
  getGameService,
  addPlayerService,
  getTopicPacksService
} from 'services/game';
import { TOPIC_PACKS, STARTED_GAME } from 'actions/types';
import { TEAMS, WRITE_OUR_OWN_UID } from 'utilities/constants';
import { tagLogger } from 'utilities/logging';

const startGame = async ({ name, gameMode, topicPackUid }, { dispatch }) => {
  const numberOfTeams = gameMode === TEAMS ? 2 : 1;

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

  route(`${gameId}/share`, true);
};

const joinGame = async ({ name, gameId }, { dispatch }) => {
  const game = await getGameService(gameId).catch(
    tagLogger('getGameService failed')
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

  route(`${gameId}/share`, true);
};

const addPlayer = async ({ gameUid, name }) => {
  const playerUid = await addPlayerService({ gameUid, name }).catch(
    tagLogger('addPlayerService failed')
  );

  return playerUid;
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

export { startGame, joinGame, getTopicPacks, addPlayer };
