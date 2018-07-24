import { addTeamService, getTeamsService, joinTeamService, getTeamPlayersService } from '../services/PickTeams';

import {
  TEAM_NAME_CHANGED,
  ADDED_TEAM,
  NEW_TEAMS,
  NEW_TEAM_PLAYERS
} from './types';

export const teamNameChanged = teamName => ({
  type: TEAM_NAME_CHANGED,
  payload: teamName
});

export const addTeam = teamName => (dispatch, getState) => {
  dispatch({
    type: ADDED_TEAM
  });

  addTeamService(teamName, getState().Game.gameUid);
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

export const joinTeam = teamUid => (dispatch, getState) => {
  const { playerUid, gameUid } = getState().Game;

  joinTeamService(teamUid, playerUid, gameUid);
};
