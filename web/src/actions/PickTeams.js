import { addTeamService, joinTeamService } from '../services/PickTeams';

import {
  TEAM_NAME_CHANGED,
  ADDED_TEAM
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

export const joinTeam = teamUid => (dispatch, getState) => {
  const { playerUid, gameUid } = getState().Game;

  joinTeamService(teamUid, playerUid, gameUid);
};
