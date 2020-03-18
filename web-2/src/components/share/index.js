import { h } from 'preact';
import { Button } from '@material-ui/core';

import { withState } from 'state/game';
import withRouter, { toTeams } from 'utilities/router';

import Logo from 'components/shared/logo';

const Share = ({ routes: [toTeams], gameId }) => {
  return (
    <div class="share">
      <div class="join__logo">
        <Logo size="small" />
      </div>
      <div class="share__container">
        <h2>Success!</h2>

        <div class="gameId">
          <span class="gameId__label">Your Game ID is</span>
          <span class="gameId__value">{gameId}</span>
        </div>

        <Button variant="contained" color="primary" onClick={toTeams}>
          Pick Teams
        </Button>
      </div>
    </div>
  );
};

const withGameIdState = withState('gameId');
const withRoutes = withRouter(toTeams);

export { Share };
export default withGameIdState(withRoutes(Share));
