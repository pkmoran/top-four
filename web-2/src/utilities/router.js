import { route } from 'preact-router';

const toTeams = gameId => {
  route(`/${gameId}/teams`);
};

export default { toTeams };
