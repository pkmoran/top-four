import { joinTeamService } from '../services/Game';
import { addTopicsRoute } from '../services/navigation';

export const selectTeam = teamUid => (dispatch, getState) => {
  const { playerUid, gameUid } = getState().Game;

  joinTeamService(teamUid, playerUid, gameUid);
};

export const addTopics = history => (dispatch, getState) => {
  const { gameId } = getState().Game;
  history.push(addTopicsRoute(gameId));
};
