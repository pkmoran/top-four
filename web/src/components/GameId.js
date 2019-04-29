import React from 'react';

import './styles/GameId.css';

const GameId = ({ gameId }) => (
  <div className="GameId">
    <span>Top Four</span>
    <span>{gameId}</span>
  </div>
);

export default GameId;
