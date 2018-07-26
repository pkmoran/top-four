import { addTeamService, joinTeamService } from '../services/PickTeams';

import {
  TEAM_NAME_CHANGED,
  ADDED_TEAM,
  TEAM_SELECTED,
  JOINING_TEAM,
  JOINED_TEAM
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

export const selectTeam = teamUid => ({
  type: TEAM_SELECTED,
  payload: teamUid
});

export const addTopics = history => (dispatch, getState) => {
  const { gameId } = getState().Game;
  history.push(`/${gameId}/addTopics`);
};

export const joinTeam = history => (dispatch, getState) => {
  const { playerUid, gameUid } = getState().Game;
  const selectedTeamUid = getState().PickTeams.selectedTeam;

  dispatch({
    type: JOINING_TEAM
  });

  joinTeamService(selectedTeamUid, playerUid, gameUid, () => {
    dispatch({
      type: JOINED_TEAM
    });

    dispatch(addTopics(history));
  });
};
