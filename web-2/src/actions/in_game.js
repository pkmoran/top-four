import sampleSize from 'lodash/sampleSize';

import { updateGameService, lockInService } from '@services';
import { UPDATE_LOCAL_RANKS } from '@actions/types';

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

const updateLocalRanks = (
  activeTopics,
  sourceIndex,
  destinationIndex,
  { dispatch }
) => {
  const reorderedTopics = [...activeTopics];
  const [removed] = reorderedTopics.splice(sourceIndex, 1);
  reorderedTopics.splice(destinationIndex, 0, removed);

  const newRanks = reorderedTopics.reduce(
    (localRanks, topic, index) => ({
      ...localRanks,
      [topic.uid]: index
    }),
    {}
  );

  dispatch({
    type: UPDATE_LOCAL_RANKS,
    payload: newRanks
  });
};

const lockIn = ({
  state: {
    gameUid,
    playerUid,
    localRanks,
    game: { rankingPlayerUid }
  }
}) => {
  const active = playerUid === rankingPlayerUid;
  const guesses = Object.keys(localRanks).reduce(
    (topicGuesses, topicUid) => ({
      ...topicGuesses,
      [topicUid]: active ? 'active' : localRanks[topicUid]
    }),
    {}
  );

  lockInService({ gameUid, playerUid, guesses });
};

export { startRound, updateLocalRanks, lockIn };
