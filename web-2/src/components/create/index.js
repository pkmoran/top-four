import { h } from 'preact';
import { useState } from 'preact/hooks';

import { withAction } from 'state/game_state';
import { startGame } from 'actions/game';

const Create = ({ startGame }) => {
  const [name, setName] = useState('');

  const handleNameChange = ({ target: { value } }) => {
    setName(value);
  };

  const handleStartGame = () => {
    startGame({ name });
  };

  return (
    <div class="create">
      <div>
        <h2>Top Four</h2>
        <input
          class="input"
          type="text"
          placeholder="Your Name"
          value={name}
          onInput={handleNameChange}
        ></input>
      </div>

      <button
        class="btn btn__primary create__start-button"
        onClick={handleStartGame}
      >
        Start Game
      </button>
    </div>
  );
};

const withStartGameAction = withAction(startGame);

export { Create };
export default withStartGameAction(Create);
