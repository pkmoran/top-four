import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { Button } from '@material-ui/core';

import withRouter, { toJoin, toCreate } from 'utilities/router';
import { withAction } from '@state';
import { clearState } from '@actions';

import Logo from 'components/shared/logo';

const Home = ({ clearState, routes: [toJoin, toCreate] }) => {
  useEffect(() => {
    clearState();
  }, []);

  return (
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
};

// actions
const withClearStateAction = withAction(clearState, 'clearState');

// routes
const withRoutes = withRouter(toJoin, toCreate);

export { Home };
export default withClearStateAction(withRoutes(Home));
