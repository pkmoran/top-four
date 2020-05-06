import { h } from 'preact';
import { FormControlLabel, RadioGroup, Radio } from '@material-ui/core';

import { INDIVIDUALS, TEAMS } from 'utilities/constants';

const GameMode = ({ gameMode, setGameMode }) => {
  return (
    <div class="game-mode">
      <span class="game-mode__header">How do you want to play?</span>
      <div class="game-mode__choices">
        <RadioGroup
          value={gameMode}
          onChange={({ target: { value } }) => setGameMode(value)}
        >
          <FormControlLabel
            value={TEAMS}
            control={<Radio disabled />}
            label="As teams (coming soon!)"
          />
          <FormControlLabel
            value={INDIVIDUALS}
            control={<Radio />}
            label="As individuals"
          />
        </RadioGroup>
      </div>
    </div>
  );
};

export default GameMode;
