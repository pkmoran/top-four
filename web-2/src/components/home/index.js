import { h } from 'preact';
import { route } from 'preact-router';

const Home = () => (
  <div class="home">
    <h1 class="home__header">Top Four</h1>
    <div class="home__buttons">
      <button class="btn btn__primary" onClick={() => route('/join')}>
        JOIN AN EXISTING GAME!
      </button>
      <span class="home__separator">or</span>
      <button class="btn btn__secondary" onClick={() => route('/create')}>
        START A NEW ONE!
      </button>
    </div>
  </div>
);

export default Home;
