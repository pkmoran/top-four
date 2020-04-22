import { h } from 'preact';
import { Button, CircularProgress, TextField } from '@material-ui/core';

const Name = ({ name, setName, loading, onStartGame }) => {
  const disabled = loading || !name;

  return (
    <div class="name">
      <span class="name__header">What&apos;s your name?</span>
      <form autoComplete="off">
        <span class="name__input">
          <TextField
            color="primary"
            label="Your Name"
            value={name}
            onInput={({ target: { value } }) => setName(value)}
          />
        </span>

        <Button
          variant="contained"
          color="primary"
          onClick={onStartGame}
          disabled={disabled}
          className="width--40-pct"
        >
          {!loading && 'Start!'}
          {loading && <CircularProgress size={24} />}
        </Button>
      </form>
    </div>
  );
};

export { Name };
export default Name;
