import React from 'react';
import _ from 'lodash';

import './styles/TeamSummary.css';

const TeamSummary = ({ name, players }) => (
  <div className="TeamSummary">
    <span>{name}</span>

    {
      _.map(players, (player, uid) => (
        <li key={uid}>{player.name}</li>
      ))
    }
  </div>
);

export default TeamSummary;
