import { joinTeamService } from '../services/Game';

export const selectTeam = teamUid => (dispatch, getState) => {
  const { playerUid, gameUid } = getState().Game;

  joinTeamService(teamUid, playerUid, gameUid);
};

export const addTopics = history => (dispatch, getState) => {
  const { gameId } = getState().Game;
  history.push(`/${gameId}/addTopics`);
};
