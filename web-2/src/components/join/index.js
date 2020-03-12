import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Button, CircularProgress, TextField } from '@material-ui/core';

import { withAction } from 'state/game';
import { joinGame } from 'actions/game';

import Logo from 'components/shared/logo';

const Join = ({ joinGame }) => {
  const [name, setName] = useState('');
  const [gameId, setGameId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const disabled = loading || !name || gameId.length !== 2;

  const handleJoinGame = () => {
    setLoading(true);

    joinGame({ name, gameId }).catch(() => {
      setGameId('');
      setLoading(false);
      setError('Invalid Game ID');
    });
  };

  const handleGameIdChanged = ({ target: { value } }) => {
    setGameId(value.toUpperCase());
    setError('');
  };

  return (
    <div class="join">
      <div class="join__logo">
        <Logo size="small" />
      </div>
      <div class="join__container">
        <div class="join__container--top">
          <h2>Join an Existing Game!</h2>
          <form autoComplete="off">
            <TextField
              name="name"
              label="What's you name?"
              value={name}
              onInput={({ target: { value } }) => setName(value)}
            />
          </form>
          <form autoComplete="off">
            <TextField
              name="gameId"
              label="What's the game code?"
              value={gameId}
              onInput={handleGameIdChanged}
              error={!!error}
              helperText={error}
            />
          </form>
        </div>
        <div class="join__container--bottom">
          <Button
            variant="contained"
            color="primary"
            onClick={handleJoinGame}
            disabled={disabled}
          >
            {!loading && 'Join!'}
            {loading && <CircularProgress size={24} />}
          </Button>
        </div>
      </div>
    </div>
  );
};

const withJoinGameAction = withAction(joinGame, 'joinGame');

export { Join };
export default withJoinGameAction(Join);
