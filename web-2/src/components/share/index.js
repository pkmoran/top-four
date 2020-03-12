import { h } from 'preact';
// import { route } from 'preact-router';
import { Button } from '@material-ui/core';

import { withState } from 'state/game';
import route from 'utilities/router';

import Logo from 'components/shared/logo';

const Share = ({ gameId }) => {
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

        <Button
          variant="contained"
          color="primary"
          onClick={() => route.toTeams(gameId)}
        >
          Pick Teams
        </Button>
      </div>
    </div>
  );
};

const withGameIdState = withState('gameId', 'gameId');

export { Share };
export default withGameIdState(Share);
