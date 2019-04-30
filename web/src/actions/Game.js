import { getGameService } from '../services/Game';
import { NEW_GAME_DATA } from './types';

export const getGameData = gameUid => (dispatch) => {
  getGameService(gameUid, game => {
    dispatch({
      type: NEW_GAME_DATA,
      payload: game
    })
  });
};
