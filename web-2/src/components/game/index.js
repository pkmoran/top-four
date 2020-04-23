import { h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { Drawer, Slide, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { withState } from '@state';
import { toPlayersWithScores } from 'utilities/state_mapping';
import compose from 'utilities/compose';
import { GAME_STATE } from 'utilities/constants';

import Header from 'components/game/header';
import Body from 'components/game/body';
import Footer from 'components/game/footer';
import Scores from 'components/game/scores';
import withGameState from 'components/game/with_game_state';

const SlideTransition = props => <Slide {...props} />;

const Game = ({ closeSnackbar, gameState, snackbarOpen, winner }) => {
  const [showScores, setShowScores] = useState(false);

  return (
    <div class="game">
      <Header onClickScores={() => setShowScores(true)} />
      <Body gameState={gameState} />
      <Footer gameState={gameState} />

      <Drawer
        classes={{ paper: 'game__drawer' }}
        anchor="right"
        open={showScores}
        onClose={() => setShowScores(false)}
      >
        <Scores />
      </Drawer>

      <Snackbar
        open={snackbarOpen}
        onClose={closeSnackbar}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        TransitionComponent={SlideTransition}
        classes={{
          root: 'game__winner-wrapper'
        }}
      >
        <Alert icon={false} elevation={3} classes={{ root: 'game__winner' }}>
          <span>{winner}</span>
        </Alert>
      </Snackbar>
    </div>
  );
};

// state
const withPlayerScoresState = withState(
  'game',
  'playerScores',
  toPlayersWithScores
);
const withPlayerUidState = withState('playerUid');

const withProps = WrappedComponent => {
  return props => {
    const { playerUid, playerScores } = props;

    let winner;

    if (
      playerScores.length > 1 &&
      playerScores[0].score === playerScores[1].score
    ) {
      winner = `There's a tie!`;
    } else if (playerScores[0].uid === playerUid) {
      winner = `You're winning!`;
    } else {
      winner = `${playerScores[0].name} is winning!`;
    }

    return <WrappedComponent {...props} winner={winner} />;
  };
};

const withEffect = WrappedComponent => {
  return props => {
    const {
      gameState: { state }
    } = props;

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const mounted = useRef(false);

    useEffect(() => {
      if (!mounted.current) {
        mounted.current = true;
        return;
      }

      if (state === GAME_STATE.BETWEEN_ROUNDS) {
        setTimeout(() => {
          setSnackbarOpen(true);
        }, 2000);
      }
    }, [state]);

    return (
      <WrappedComponent
        {...props}
        closeSnackbar={() => setSnackbarOpen(false)}
        snackbarOpen={snackbarOpen}
      />
    );
  };
};

const wrappers = compose(
  withPlayerScoresState,
  withPlayerUidState,
  withGameState,
  withProps,
  withEffect
);

export { Game };
export default wrappers(Game);
