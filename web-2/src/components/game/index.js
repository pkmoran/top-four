import { h } from 'preact';

import Header from 'components/game/header';
import Body from 'components/game/body';
import Footer from 'components/game/footer';

const Game = () => {
  return (
    <div class="game">
      <Header />
      <Body />
      <Footer />
    </div>
  );
};

export { Game };
export default Game;
