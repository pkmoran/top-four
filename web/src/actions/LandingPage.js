import { startGameService } from '../services/LandingPage';

import {
  JOIN_GAME,
  JOIN_GAME_ERROR,
  GAME_ID_CHANGED,
  STARTING_GAME,
  STARTED_GAME,
  START_GAME_ERROR
} from './types';

export const gameIdChanged = gameId => ({
  type: GAME_ID_CHANGED,
  payload: gameId
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

export const startGame = () => (dispatch) => {
  dispatch({
    type: STARTING_GAME
  });

  startGameService((gameId) => {
    dispatch({
      type: STARTED_GAME,
      payload: gameId
    });
  }, () => {
    dispatch({
      type: START_GAME_ERROR,
      payload: 'Error starting a new game'
    });
  });
};
