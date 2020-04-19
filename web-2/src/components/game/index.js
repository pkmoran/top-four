import { h } from 'preact';

import Header from 'components/game/header';
import Body from 'components/game/body';
import Footer from 'components/game/footer';
import withGameState from 'components/game/with_game_state';

const Game = ({ gameState }) => {
  return (
    <div class="game">
      <Header gameState={gameState} />
      <Body gameState={gameState} />
      <Footer gameState={gameState} />
    </div>
  );
};

export { Game };
export default withGameState(Game);
