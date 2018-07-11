import { getGamesService } from '../services/Game';

import {
  NEW_GAMES
} from './types';

export const getGames = () => (dispatch) => {
  getGamesService((games) => {
    dispatch({
      type: NEW_GAMES,
      payload: games
    });
  });
};
