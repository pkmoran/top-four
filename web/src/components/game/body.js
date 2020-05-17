import { h } from 'preact';

import RankableTopics from 'components/game/rankable_topics';

const Body = ({ gameState }) => {
  return (
    <div class="game-body">
      <RankableTopics gameState={gameState} />
    </div>
  );
};

export { Body };
export default Body;
