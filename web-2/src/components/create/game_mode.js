import { h } from 'preact';

import { INDIVIDUALS, TEAMS } from 'utilities/constants';

const GameMode = ({ gameMode, setGameMode }) => {
  return (
    <div class="game-mode">
      <h3>How do you want to play?</h3>
      <div class="game-mode__choices">
        <span>
          <input
            type="radio"
            id="teams"
            name="game-mode"
            value={TEAMS}
            onChange={() => setGameMode(TEAMS)}
            checked={gameMode === TEAMS}
          />
          <label htmlFor="teams">On 2 teams</label>
        </span>
        <span>
          <input
            type="radio"
            id="individuals"
            name="game-mode"
            value={INDIVIDUALS}
            onChange={() => setGameMode(INDIVIDUALS)}
            checked={gameMode === INDIVIDUALS}
          />
          <label htmlFor="individuals">As individuals</label>
        </span>
      </div>
    </div>
  );
};

export default GameMode;
