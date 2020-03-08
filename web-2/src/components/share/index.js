import { h } from 'preact';
import { Button } from '@material-ui/core';

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

        <Button variant="contained" color="primary">
          Pick Teams
        </Button>
      </div>
    </div>
  );
};

export default Share;
