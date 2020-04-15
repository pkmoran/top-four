import { toRoot } from 'utilities/router';
import { subscribeToGameUpdatesService } from '@services';
import { GAME_UPDATE } from '@actions/types';

let previousGame;

const subscribeToGameUpdates = (gameUid, { dispatch }) => {
  subscribeToGameUpdatesService(gameUid, game => {
    if (game) {
      const localRanks = getLocalRanks(game, previousGame);

      dispatch({
        type: GAME_UPDATE,
        payload: { game, localRanks }
      });

      previousGame = { ...game };
    } else {
      toRoot()();
    }
  });
};

const getLocalRanks = (game, previousGame) => {
  const { state: previousState, localRanks } = previousGame || {};
  const { state: nextState, topics } = game;

  if (!previousState && nextState === 'ranking') {
    return defaultLocalRanks(topics);
  }

  return localRanks;
};

const defaultLocalRanks = topics =>
  Object.keys(topics)
    .map(uid => ({ uid, ...topics[uid] }))
    .filter(({ status }) => status === 'active')
    .reduce(
      (localRanks, topic, index) => ({
        ...localRanks,
        [topic.uid]: index
      }),
      {}
    );

export { subscribeToGameUpdates };
