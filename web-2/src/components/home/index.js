import { h } from 'preact';
import { route } from 'preact-router';
import { Button } from '@material-ui/core';

import Logo from 'components/shared/logo';

const Home = () => (
  <div class="home">
    <div class="home__header">
      <Logo />
    </div>
    <div class="home__buttons">
      <Button
        variant="contained"
        disableElevation
        onClick={() => route('/join')}
      >
        Join an existing game!
      </Button>
      <span class="home__separator">or</span>
      <Button
        variant="contained"
        disableElevation
        onClick={() => route('/create')}
      >
        Start a new one!
      </Button>
    </div>
  </div>
);

export default Home;
