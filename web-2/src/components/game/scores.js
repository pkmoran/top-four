import { h } from 'preact';

import { withState } from '@state';
import { toPlayersWithScores } from 'utilities/state_mapping';

const Scores = ({ playerScores }) => {
  return (
    <div class="scores">
      <h1>Scores!</h1>

      {playerScores.map(({ uid, name, score }, index) => (
        <div class="scores__player-score" key={uid}>
          <span class="scores__player-score--index">{`${index + 1}.`}</span>
          <span class="scores__player-score--name">{name}</span>
          <span class="scores__player-score--score">{score}</span>
        </div>
      ))}
    </div>
  );
};

const withPlayerScoresState = withState(
  'game',
  'playerScores',
  toPlayersWithScores
);

export { Scores };
export default withPlayerScoresState(Scores);
