import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Button from '@material-ui/core/Button';

import requireGame from './requireGame';
import GameId from './GameId';
import TeamSummary from './TeamSummary';

import './styles/Homescreen.css';

class Homescreen extends Component {
  renderTeams() {
    return this.props.teams.map((team) => {
      const players = this.props.teamPlayers[team.uid];

      return <TeamSummary key={team.uid} name={team.name} players={players} />;
    });
  }

  render() {
    return (
      <div className="Homescreen">
        <GameId />

        <h1>Who&apos;s Up?</h1>

        <Button>I&apos;m Up!</Button>

        {this.renderTeams()}
      </div>
    );
  }
}

export const getTeamPlayers = ({ teams, players }) => {
  const teamPlayers = {};
  _.forEach(teams, (team, uid) => {
    teamPlayers[uid] = [];
  });
  _.forEach(players, (player, uid) => {
    teamPlayers[player.teamUid].push({ ...player, uid });
  });
  return teamPlayers;
};

const mapStateToProps = ({ Game }) => ({
  teams: _.map(Game.teams, (val, uid) => ({ ...val, uid })),
  teamPlayers: getTeamPlayers(Game)
});

export default connect(mapStateToProps)(requireGame(Homescreen));
