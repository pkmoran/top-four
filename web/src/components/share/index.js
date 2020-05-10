import { h } from 'preact';
import { Button } from '@material-ui/core';

import compose from 'utilities/compose';
import { withState } from '@state';
import withRouter, { toTeams, toAddTopics, toGame } from 'utilities/router';

import Logo from 'components/shared/logo';

const Share = ({ gameId, nextButton }) => {
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

        <div class="share__footer">
          <span class="share__description">
            Share this ID with your friends so they can join your game
          </span>

          {nextButton}
        </div>
      </div>
    </div>
  );
};

// state
const withGameIdState = withState('gameId');
const withGameModeState = withState('game.noTeams', 'noTeams');
const withTopicPackState = withState('game.topicPack', 'topicPack');

// routes
const withRoutes = withRouter(toTeams, toAddTopics, toGame);

const withNextButton = WrappedComponent => {
  return props => {
    const {
      noTeams,
      topicPack,
      routes: [toTeams, toAddTopics, toGame]
    } = props;

    let nextButton;
    if (!noTeams) {
      nextButton = (
        <Button variant="contained" color="primary" onClick={toTeams}>
          Pick Teams
        </Button>
      );
    } else if (!topicPack) {
      nextButton = (
        <Button variant="contained" color="primary" onClick={toAddTopics}>
          Add Topics
        </Button>
      );
    } else {
      nextButton = (
        <Button variant="contained" color="primary" onClick={toGame}>
          Done
        </Button>
      );
    }

    return <WrappedComponent {...props} nextButton={nextButton} />;
  };
};

const wrappers = compose(
  withGameIdState,
  withGameModeState,
  withTopicPackState,
  withRoutes,
  withNextButton
);

export { withNextButton, Share };
export default wrappers(Share);
