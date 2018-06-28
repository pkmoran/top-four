import { startGameService, addPlayer } from '../services/LandingPage';

import {
  JOIN_GAME,
  JOIN_GAME_ERROR,
  GAME_ID_CHANGED,
  STARTING_GAME,
  STARTED_GAME,
  START_GAME_ERROR,
  NAME_CHANGED
} from './types';

export const gameIdChanged = gameId => ({
  type: GAME_ID_CHANGED,
  payload: gameId
});

export const nameChanged = name => ({
  type: NAME_CHANGED,
  payload: name
});

export const joinGame = (gameId) => {
  if (gameId) {
    return {
      type: JOIN_GAME
    };
  }

  return {
    type: JOIN_GAME_ERROR,
    payload: 'Game ID cannot be empty'
  };
};

export const startGame = history => (dispatch, getState) => {
  dispatch({
    type: STARTING_GAME
  });

  startGameService(({ gameId, gameUid }) => {
    dispatch({
      type: STARTED_GAME,
      payload: { gameId, gameUid }
    });

    addPlayer(gameUid, getState().Game.name, () => {
      history.push(`/${gameId}/addTopics`);
    }, () => {
      dispatch({
        type: START_GAME_ERROR,
        payload: 'Error starting a new game'
      });
    });
  }, () => {
    dispatch({
      type: START_GAME_ERROR,
      payload: 'Error starting a new game'
    });
  });
};
