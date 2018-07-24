import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import _ from 'lodash';

import GameId from './GameId';
import TeamRow from './TeamRow';
import requireGame from './requireGame';
import { teamNameChanged, addTeam, joinTeam } from '../actions';

import './styles/PickTeams.css';

class PickTeamsComponent extends Component {
  constructor(props) {
    super(props);

    this.teamNameChanged = this.teamNameChanged.bind(this);
  }

  teamNameChanged(event) {
    this.props.teamNameChanged(event.target.value);
  }

  renderTeams() {
    return this.props.teams.map(team => (
      <TeamRow
        key={team.uid}
        name={team.name}
        playerCount={team.playerCount}
        onClick={() => this.props.joinTeam(team.uid)}
      />));
  }

  render() {
    return (
      <div className="PickTeams">
        <GameId />

        <h1>Pick Teams!</h1>

        <div>
          <TextField
            onChange={this.teamNameChanged}
            value={this.props.teamName}
            id="teamName"
            label="Team Name"
            placeholder="e.g. Voldemort"
          />

          <Button
            onClick={() => this.props.addTeam(this.props.teamName)}
            disabled={!this.props.addTeamEnabled}
          >
            Add Team
          </Button>
        </div>

        <span>OR</span>

        <div className="TeamNames">
          <div className="TeamNamesHeader">
            <span>Join Team:</span>
            <span># of players</span>
          </div>
        </div>

        {this.renderTeams()}
      </div>
    );
  }
}

const teamsAndPlayerCounts = ({ teams, teamPlayers }) => {
  const withPlayerCount = _.reduce(teams, (result, value, key) => {
    const intermediateResult = result;
    intermediateResult[key] = { ...value, playerCount: 0 };
    return intermediateResult;
  }, {});

  _.forEach(teamPlayers, ({ teamUid }) => {
    withPlayerCount[teamUid].playerCount += 1;
  });

  return _.map(withPlayerCount, (val, uid) => ({ ...val, uid }));
};

const mapStateToProps = ({ PickTeams, Game }) => ({
  teamName: PickTeams.teamName,
  addTeamEnabled: PickTeams.teamName,
  teams: teamsAndPlayerCounts(Game)
});

export default connect(
  mapStateToProps,
  {
    teamNameChanged,
    addTeam,
    joinTeam
  }
)(requireGame(PickTeamsComponent));
