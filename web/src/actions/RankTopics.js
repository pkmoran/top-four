import _ from 'lodash';
import { updateTopicsService, endRoundService, setRoundRanked, updatePlayerScoreService } from '../services/Game';

import { UPDATE_MY_RANKS, SHOW_LOCK_IN_DIALOG, RESET_LOCAL_RANKING } from './types';

export const updateMyRanks = (topics, sourceIndex, destinationIndex) => {
  const reorderedTopics = Array.from(topics);
  const [removed] = reorderedTopics.splice(sourceIndex, 1);
  reorderedTopics.splice(destinationIndex, 0, removed);

  const localRanks = _.reduce(
    reorderedTopics,
    (result, value, index) => ({
      ...result,
      [value.uid]: index
    }),
    {}
  );

  return {
    type: UPDATE_MY_RANKS,
    payload: localRanks
  };
};

export const showLockInDialog = () => ({
  type: SHOW_LOCK_IN_DIALOG,
  payload: true
});

export const hideLockInDialog = () => ({
  type: SHOW_LOCK_IN_DIALOG,
  payload: false
});

export const lockIn = () => (dispatch, getState) => {
  dispatch(hideLockInDialog());

  const { gameUid } = getState().Game;
  const localTopicRanks = getState().RankTopics.localRanks;
  const topics = {};

  _.forEach(localTopicRanks, (localRank, localUid) => {
    const topic = _.find(getState().Game.topics, (topic, uid) => uid === localUid);
    topic.status = 'ranked';
    topic.rank = localRank;

    topics[localUid] = topic;
  });

  updateTopicsService(topics, gameUid, () => {
    setRoundRanked(gameUid);
  });
};

const resetLocalRanking = () => ({
  type: RESET_LOCAL_RANKING
});

export const endRound = () => (dispatch, getState) => {
  const { gameUid, topics } = getState().Game;

  const rankedTopics = _.pickBy(topics, topic => topic.status === 'ranked');
  _.forEach(rankedTopics, topic => {
    topic.status = 'unavailable';
  });

  updateTopicsService(rankedTopics, gameUid, () => {
    endRoundService(gameUid);
  });
};

export const uploadScore = rankedTopics => (dispatch, getState) => {
  const correct = _.filter(rankedTopics, topic => topic.isCorrect).length;

  const { players, playerUid, gameUid } = getState().Game;
  const score = players[playerUid].score;

  updatePlayerScoreService(gameUid, playerUid, score + correct);
};

export const roundEnded = history => (dispatch) => {
  dispatch(resetLocalRanking());
  history.goBack();
};
