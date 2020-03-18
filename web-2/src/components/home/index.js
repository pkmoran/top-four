import { h } from 'preact';
import { Button } from '@material-ui/core';

import withRouter, { toJoin, toCreate } from 'utilities/router';

import Logo from 'components/shared/logo';

const Home = ({ routes: [toJoin, toCreate] }) => (
  <div class="home">
    <div class="home__header">
      <Logo />
    </div>
    <div class="home__buttons">
      <Button variant="contained" disableElevation onClick={toJoin}>
        Join an existing game!
      </Button>
      <span class="home__separator">or</span>
      <Button variant="contained" disableElevation onClick={toCreate}>
        Start a new one!
      </Button>
    </div>
  </div>
);

// routes
const withRoutes = withRouter(toJoin, toCreate);

export { Home };
export default withRoutes(Home);
