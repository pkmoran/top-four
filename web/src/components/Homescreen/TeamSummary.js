import React from 'react';
import map from 'lodash/map';

import PlayerSummary from './PlayerSummary';

import './styles/TeamSummary.css';

const TeamSummary = ({ name, score, players }) => (
  <div className="TeamSummary">
    <span className="TeamSummary__name">{name}</span>
    <span className="TeamSummary__average-score">
      <b>Average</b> {score}
    </span>
    {map(players, (player, uid) => (
      <div key={uid} className="TeamSummary__player">
        <PlayerSummary player={player} />
      </div>
    ))}
  </div>
);

export default TeamSummary;
