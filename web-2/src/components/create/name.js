import { h } from 'preact';
import { TextField } from '@material-ui/core';

const Name = ({ name, setName }) => {
  return (
    <div class="name">
      <span class="name__header">What&apos;s your name?</span>
      <TextField
        color="primary"
        label="Your Name"
        value={name}
        onInput={({ target: { value } }) => setName(value)}
      />
    </div>
  );
};

export default Name;
