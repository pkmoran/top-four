import sampleSize from 'lodash/sampleSize';

import { addTopicService, updateGameService } from '@services';
import { UPDATE_LOCAL_RANKS } from '@actions/types';

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

export * from '@actions/topic_packs';
export * from '@actions/pre_game';
export * from '@actions/subscribe';

export { addTopic, startRound, updateLocalRanks };
