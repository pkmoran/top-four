import _ from 'lodash';
import {
  updateTopicsService,
  endRoundService,
  setRoundRankedService,
  updatePlayerScoreService,
  setPlayerLockedInService
} from '../services/Game';

import {
  UPDATE_MY_RANKS,
  SHOW_LOCK_IN_DIALOG,
  RESET_LOCAL_RANKING,
  SHOW_REVEAL_DIALOG,
  LOCKED_IN
} from './types';

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

const lockedIn = () => ({
  type: LOCKED_IN
});

const showRevealDialog = () => ({
  type: SHOW_REVEAL_DIALOG,
  payload: true
});

export const hideRevealDialog = () => ({
  type: SHOW_REVEAL_DIALOG,
  payload: false
})

export const lockIn = () => (dispatch, getState) => {
  dispatch(hideLockInDialog());

  const { gameUid, playerUid } = getState().Game;

  setPlayerLockedInService(gameUid, playerUid, true, () => {
    dispatch(lockedIn());
  });
};

export const reveal = force => (dispatch, getState) => {
  const { players } = getState().Game;

  const allLockedIn = _.filter(players.array, { lockedIn: true }).length === players.array.length;

  if (allLockedIn || force) {
    if (getState().RankTopics.showRevealDialog) {
      dispatch(hideRevealDialog());
    }

    setRoundRanked(getState);
  } else {
    dispatch(showRevealDialog());
  }
};

const setRoundRanked = getState => {
  const { gameUid } = getState().Game;
  const { localRanks } = getState().RankTopics;
  const topics = {};

  _.forEach(localRanks, (localRank, localUid) => {
    const topic = _.find(getState().Game.topics.map, (topic, uid) => uid === localUid);
    topic.status = 'ranked';
    topic.rank = localRank;

    topics[localUid] = topic;
  });

  updateTopicsService(topics, gameUid, () => {
    setRoundRankedService(gameUid);
  });
};

const resetLocalRanking = () => ({
  type: RESET_LOCAL_RANKING
});

export const endRound = () => (dispatch, getState) => {
  const { gameUid, playerUid, topics } = getState().Game;

  const rankedTopics = _.pickBy(topics.map, topic => topic.status === 'ranked');
  _.forEach(rankedTopics, topic => {
    topic.status = 'unavailable';
  });

  updateTopicsService(rankedTopics, gameUid, () => {
    setPlayerLockedInService(gameUid, playerUid, false);
    endRoundService(gameUid);
  });
};

export const uploadScore = rankedTopics => (dispatch, getState) => {
  const correct = _.filter(rankedTopics, topic => topic.isCorrect).length;

  const { players, playerUid, gameUid } = getState().Game;
  const score = players.map[playerUid].score;

  updatePlayerScoreService(gameUid, playerUid, score + correct);
};

export const roundEnded = history => (dispatch, getState) => {
  const { gameUid, playerUid } = getState().Game;

  dispatch(resetLocalRanking());
  setPlayerLockedInService(gameUid, playerUid, false);

  history.goBack();
};
