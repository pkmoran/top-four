import React from 'react';
import _ from 'lodash';

import PlayerSummary from './PlayerSummary';

import './styles/TeamSummary.css';

const TeamSummary = ({ name, score, players }) => (
  <div className="TeamSummary">
    <div className="TeamSummaryHeader">
      <span>{name}</span>
      <span>{score}</span>
    </div>
    {_.map(players, (player, uid) => (
      <PlayerSummary key={uid} player={player} />
    ))}
  </div>
);

export default TeamSummary;
