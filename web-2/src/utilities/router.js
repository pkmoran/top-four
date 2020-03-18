import { route } from 'preact-router';

import { withState } from 'state/game';

const toRoot = () => () => {
  route('/', true);
};

const toJoin = () => () => {
  route('/join');
};

const toCreate = () => () => {
  route('/create');
};

const toTeams = gameId => () => {
  route(`/${gameId}/teams`);
};

const toAddTopics = gameId => () => {
  route(`/${gameId}/topics`);
};

const withRouter = (...routeFns) => {
  return WrappedComponent => {
    const Component = props => {
      const { gameId } = props;

      const routes = routeFns.map(routeFn => routeFn(gameId));

      return <WrappedComponent {...props} routes={routes} />;
    };

    const withGameIdState = withState('gameId');
    return withGameIdState(Component);
  };
};

export { toRoot, toJoin, toCreate, toTeams, toAddTopics };
export default withRouter;
