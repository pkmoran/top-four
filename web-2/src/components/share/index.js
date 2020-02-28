import { h } from 'preact';

const Share = ({ gameId }) => {
  return (
    <div class="share">
      <h2>Success!</h2>
      <div>
        <span>Your Game ID is {gameId}</span>
      </div>
      <button class="btn btn__primary">Pick Teams</button>
    </div>
  );
};

export default Share;
