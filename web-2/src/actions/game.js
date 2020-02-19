import {
  startGameService,
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

  if (data) {
    const { gameId, gameUid } = data;

    const playerUid = await addPlayer({ gameUid, name });

    if (playerUid) {
      dispatch({
        type: STARTED_GAME,
        payload: { gameId, gameUid, playerUid, name }
      });
    }
  }
};

const addPlayer = async ({ gameUid, name }) => {
  const playerUid = await addPlayerService({ gameUid, name }).catch(
    tagLogger('addPlayerService failed')
  );

  return playerUid;
};

const getTopicPacks = async (
  { state, dispatch },
  service = getTopicPacksService
) => {
  if (state.topicPacks && state.topicPacks.length > 0) return;

  const topicPacks = await service().catch(
    tagLogger('getTopicPacksService failed')
  );

  if (topicPacks) {
    dispatch({ type: TOPIC_PACKS, payload: topicPacks });
  }
};

export { startGame, getTopicPacks };
