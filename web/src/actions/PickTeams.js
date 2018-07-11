import { addTeamService, getTeamsService } from '../services/PickTeams';

import {
  TEAM_NAME_CHANGED,
  ADDING_TEAM,
  ADDED_TEAM,
  NEW_TEAMS
} from './types';

export const teamNameChanged = teamName => ({
  type: TEAM_NAME_CHANGED,
  payload: teamName
});

export const addTeam = teamName => (dispatch, getState) => {
  dispatch({
    type: ADDING_TEAM
  });

  addTeamService(teamName, getState().Game.gameUid, () => {
    dispatch({
      type: ADDED_TEAM
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
