import {
  getGamesService,
  getTeamsService,
  getTopicsService,
  getPlayersService
} from '../services/Game';

import {
  NEW_GAMES,
  NEW_TEAMS,
  NEW_TOPICS,
  NEW_PLAYERS
} from './types';

export const getGames = () => (dispatch) => {
  getGamesService((games) => {
    dispatch({
      type: NEW_GAMES,
      payload: games
    });
  });
};

export const getTeams = () => (dispatch, getState) => {
  getTeamsService(getState().Game.gameUid, (teams) => {
    dispatch({
      type: NEW_TEAMS,
      payload: teams
    });
  });
};

export const getPlayers = () => (dispatch, getState) => {
  getPlayersService(getState().Game.gameUid, (players) => {
    dispatch({
      type: NEW_PLAYERS,
      payload: players
    });
  });
};

export const getTopics = () => (dispatch, getState) => {
  getTopicsService(getState().Game.gameUid, (topics) => {
    dispatch({
      type: NEW_TOPICS,
      payload: topics
    });
  });
};

export const getGameData = () => (dispatch) => {
  dispatch(getTeams());
  dispatch(getTopics());
  dispatch(getPlayers());
};
