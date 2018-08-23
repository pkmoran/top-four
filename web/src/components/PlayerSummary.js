import React from 'react';

import './styles/PlayerSummary.css';

const PlayerSummary = ({ player }) => (
  <div className="PlayerSummary">
    <li>{player.name}</li>
    <span>{player.score || 0}</span>
  </div>
);

export default PlayerSummary;
