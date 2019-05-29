import { startGameService, addPlayerService } from '../services/LandingPage';
import { getGameFromIdService, getPacksService } from '../services/Game';
import { getGameData } from './';

import { WRITE_OUR_OWN_UID } from '../constants';

import {
  JOIN_GAME_ERROR,
  GAME_ID_CHANGED,
  STARTING_GAME,
  STARTED_GAME,
  START_GAME_ERROR,
  NAME_CHANGED,
  SHOW_JOIN_GAME,
  ADDED_PLAYER,
  JOINING_GAME,
  TEAM_NUMBER_CHANGED,
  SHOW_START_GAME_DIALOG,
  LOADING_TOPIC_PACKS,
  TOPIC_PACKS,
  START_GAME_STEP,
  TOPIC_PACK_CHANGED
} from './types';

export const gameIdChanged = gameId => ({
  type: GAME_ID_CHANGED,
  payload: gameId
});

export const nameChanged = name => ({
  type: NAME_CHANGED,
  payload: name
});

export const showJoinGameSection = () => ({
  type: SHOW_JOIN_GAME
});

const loadingTopicPacks = loading => ({
  type: LOADING_TOPIC_PACKS,
  payload: loading
});

export const teamNumberChanged = numberOfTeams => ({
  type: TEAM_NUMBER_CHANGED,
  payload: numberOfTeams
});

export const showStartGameDialog = () => (dispatch, getState) => {
  dispatch(loadingTopicPacks(true));

  getPacksService().then(topicPacks => {
    dispatch(loadingTopicPacks(false));

    dispatch({
      type: TOPIC_PACKS,
      payload: topicPacks
    });

    dispatch({
      type: SHOW_START_GAME_DIALOG,
      payload: true
    });
  });
};

export const showPickTeams = () => ({
  type: START_GAME_STEP,
  payload: 'pickTeams'
});

export const showPickTopicPacks = () => ({
  type: START_GAME_STEP,
  payload: 'pickTopicPacks'
});

export const topicPackChanged = topicPackUid => ({
  type: TOPIC_PACK_CHANGED,
  payload: topicPackUid
})

export const hideStartGameDialog = () => ({
  type: SHOW_START_GAME_DIALOG,
  payload: false
});

export const joinGame = (gameId, history) => (dispatch, getState) => {
  if (!gameId) {
    dispatch({
      type: JOIN_GAME_ERROR,
      payload: 'Game ID cannot be empty'
    });

    return;
  }

  dispatch({
    type: JOINING_GAME
  });

  getGameFromIdService(gameId).then(game => {
    if (game) {
      const { gameUid } = game;

      dispatch({
        type: STARTED_GAME,
        payload: { gameId, gameUid }
      });

      dispatch(getGameData(gameUid));
      addPlayerService(gameUid, getState().Game.name, (playerUid) => {
        dispatch({
          type: ADDED_PLAYER,
          payload: playerUid
        });

        history.push(`/${gameId}/pickTeams`);
      }, () => {
        dispatch({
          type: JOIN_GAME_ERROR,
          payload: 'Could not join game'
        });
      });
    }

    dispatch({
      type: JOIN_GAME_ERROR,
      payload: 'Game ID does not exist'
    });
  });
};

export const startGame = (numberOfTeams, topicPackUid, history) => (dispatch, getState) => {
  dispatch({
    type: STARTING_GAME
  });

  startGameService(numberOfTeams,
    topicPackUid !== WRITE_OUR_OWN_UID ? topicPackUid : null,
    ({ gameId, gameUid }) => {
      dispatch({
        type: STARTED_GAME,
        payload: { gameId, gameUid }
      });

      dispatch(getGameData(gameUid));
      addPlayerService(gameUid, getState().Game.name, (playerUid) => {
        dispatch({
          type: ADDED_PLAYER,
          payload: playerUid
        });

        history.push(`/${gameId}/pickTeams`);
      }, () => {
        dispatch({
          type: START_GAME_ERROR,
          payload: 'Error starting a new game'
        });
      });
    }, err => {
      dispatch({
        type: START_GAME_ERROR,
        payload: 'Error starting a new game'
      });
    });
};
