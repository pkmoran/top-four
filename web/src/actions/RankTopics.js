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
  LOCKED_IN,
  HIDE_REVEAL_DIALOG
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

const showRevealDialog = pendingRevealAction => ({
  type: SHOW_REVEAL_DIALOG,
  payload: pendingRevealAction
});

export const hideRevealDialog = () => ({
  type: HIDE_REVEAL_DIALOG
})

export const lockIn = () => (dispatch, getState) => {
  dispatch(hideLockInDialog());

  const { gameUid, playerUid } = getState().Game;

  setPlayerLockedInService(gameUid, playerUid, true, () => {
    dispatch(lockedIn());
  });
};

export const allPlayersLockedIn = players => {
  return _.filter(players, { lockedIn: true }).length === players.length;
}

export const reveal = (topic, force) => (dispatch, getState) => {
  const { players, topics, gameUid, state } = getState().Game;

  const allLockedIn = allPlayersLockedIn(players.array);

  if (allLockedIn || force || state === 'ranked') {
    if (getState().RankTopics.showRevealDialog) {
      dispatch(hideRevealDialog());
    }

    setRoundRanked(
      { [topic.uid]: getState().RankTopics.localRanks[topic.uid] },
      topics.map,
      gameUid,
      state
    );
  } else {
    const pendingRevealAction = () => dispatch(reveal(topic, true));
    dispatch(showRevealDialog(pendingRevealAction));
  }
};

export const revealAll = force => (dispatch, getState) => {
  const { players, topics, gameUid, state } = getState().Game;

  const allLockedIn = allPlayersLockedIn(players.array);

  if (allLockedIn || force) {
    if (getState().RankTopics.showRevealDialog) {
      dispatch(hideRevealDialog());
    }

    setRoundRanked(getState().RankTopics.localRanks, topics.map, gameUid, state);
  } else {
    const pendingRevealAction = () => dispatch(revealAll(true));
    dispatch(showRevealDialog(pendingRevealAction));
  }
};

const setRoundRanked = (localRanks, topics, gameUid, state) => {
  const topicsToUpdate = {};

  _.forEach(localRanks, (localRank, localUid) => {
    const topic = _.find(topics, (topic, uid) => uid === localUid);
    topic.status = 'ranked';
    topic.rank = localRank;

    topicsToUpdate[localUid] = topic;
  });

  updateTopicsService(topicsToUpdate, gameUid, () => {
    if (state !== 'ranked') {
      setRoundRankedService(gameUid);
    }
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
