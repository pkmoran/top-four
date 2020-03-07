import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Button, TextField } from '@material-ui/core';

import { withAction } from 'state/game';
import { joinGame } from 'actions/game';

import Logo from 'components/shared/logo';

const Join = ({ joinGame }) => {
  const [name, setName] = useState('');
  const [gameId, setGameId] = useState('');

  const handleJoinGame = () => {
    joinGame({ name, gameId }).catch(() => {
      console.log('Join component failed');
    });
  };

  return (
    <div class="join">
      <div class="join__logo">
        <Logo size="small" />
      </div>
      <div class="join__container">
        <div class="join__container--top">
          <h2>Join an Existing Game!</h2>
          <TextField
            name="name"
            label="What's you name?"
            value={name}
            onInput={({ target: { value } }) => setName(value)}
          />
          <TextField
            name="gameId"
            label="What's the game code?"
            value={gameId}
            onInput={({ target: { value } }) => setGameId(value)}
          />
        </div>
        <div class="join__container--bottom">
          <Button variant="contained" color="primary" onClick={handleJoinGame}>
            Join!
          </Button>
        </div>
      </div>
    </div>
  );
};

const withJoinGameAction = withAction(joinGame, 'joinGame');

export { Join };
export default withJoinGameAction(Join);
