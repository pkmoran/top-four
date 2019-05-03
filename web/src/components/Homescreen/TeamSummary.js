import React from 'react';
import map from 'lodash/map';

import PlayerSummary from './PlayerSummary';

import './styles/TeamSummary.css';

const TeamSummary = ({ name, score, players }) => (
  <div className="TeamSummary">
    <div className="TeamSummaryHeader">
      <span>{name}</span>
      <span>{score}</span>
    </div>
    {map(players, (player, uid) => (
      <PlayerSummary key={uid} player={player} />
    ))}
  </div>
);

export default TeamSummary;
