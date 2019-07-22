import React from 'react';
import map from 'lodash/map';

import PlayerSummary from './PlayerSummary';

import './styles/TeamSummary.css';

const TeamSummary = ({ name, score, players }) => (
  <div className="TeamSummary">
    <div className="TeamSummaryHeader">
      <span className="TeamSummaryHeader__name">{name}</span>
      <span className="TeamSummaryHeader__average">average score</span>
      <span className="TeamSummaryHeader__score">{score}</span>
    </div>
    {map(players, (player, uid) => (
      <div key={uid} className="TeamSummary__player">
        <PlayerSummary player={player} />
      </div>
    ))}
  </div>
);

export default TeamSummary;
