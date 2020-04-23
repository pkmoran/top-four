import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Drawer } from '@material-ui/core';

import Header from 'components/game/header';
import Body from 'components/game/body';
import Footer from 'components/game/footer';
import Scores from 'components/game/scores';
import withGameState from 'components/game/with_game_state';

const Game = ({ gameState }) => {
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
    </div>
  );
};

export { Game };
export default withGameState(Game);
