import {
  getGamesService,
  getTeamsService,
  getTeamPlayersService,
  getTopicsService
} from '../services/Game';

import {
  NEW_GAMES,
  NEW_TEAMS,
  NEW_TEAM_PLAYERS,
  NEW_TOPICS
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

export const getTeamPlayers = () => (dispatch, getState) => {
  getTeamPlayersService(getState().Game.gameUid, (teamPlayers) => {
    dispatch({
      type: NEW_TEAM_PLAYERS,
      payload: teamPlayers
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
  dispatch(getGames());
  dispatch(getTeams());
  dispatch(getTeamPlayers());
  dispatch(getTopics());
};
