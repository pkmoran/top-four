import { h } from 'preact';

const Name = ({ name, setName }) => {
  return (
    <div class="name">
      <h3>What&apos;s your name?</h3>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onInput={({ target: { value } }) => setName(value)}
      />
    </div>
  );
};

export default Name;
