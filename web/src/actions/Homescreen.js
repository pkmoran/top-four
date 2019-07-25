import pickBy from 'lodash/pickBy';
import sampleSize from 'lodash/sampleSize';
import forEach from 'lodash/forEach';
import {
  updateGameService,
  watchGameStateService,
  stopWatchingGameStateService
} from '../services/Game';
import { rankTopicsRoute } from '../services/navigation';
import { EventBuilder } from '../services/analytics';

import { SHOW_START_ROUND_DIALOG } from './types';

export const showStartRoundDialog = () => ({
  type: SHOW_START_ROUND_DIALOG,
  payload: true
});

export const hideStartRoundDialog = () => ({
  type: SHOW_START_ROUND_DIALOG,
  payload: false
});

export const randTopicIds = topics => {
  const availableTopics = pickBy(topics, topic => topic.status === 'available');
  return sampleSize(Object.keys(availableTopics), 4);
};

export const startRound = () => (dispatch, getState) => {
  dispatch(hideStartRoundDialog());

  const { gameUid, topics, playerUid, hasRanked, players } = getState().Game;

  if (!hasRanked) {
    new EventBuilder()
      .category('game_data')
      .action('number_of_players')
      .value(players.array.length)
      .send();
  }

  forEach(randTopicIds(topics.map), topicId => {
    topics.map[topicId].status = 'active';
  });

  const game = {
    rankingPlayerUid: playerUid,
    state: 'ranking',
    topics: topics.map,
    hasRanked: true
  };

  updateGameService(game, gameUid);
};

export const startRanking = history => (dispatch, getState) => {
  const { gameId } = getState().Game;
  history.replace(rankTopicsRoute(gameId));
};

export const watchGameStateForHomescreen = history => (dispatch, getState) => {
  const { gameUid, gameId } = getState().Game;
  let locked = false;

  watchGameStateService(gameUid, newState => {
    if (newState === 'ranking' && !locked) {
      locked = true;

      dispatch(hideStartRoundDialog());
      stopWatchingGameStateService(gameUid);

      history.replace(rankTopicsRoute(gameId));
    }
  });
};

export const stopWatchingGameStateForHomescreen = () => (
  dispatch,
  getState
) => {
  stopWatchingGameStateService(getState().Game.gameUid);
};
