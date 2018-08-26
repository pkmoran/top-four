import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import _ from 'lodash';

import GameId from './GameId';
import TeamRow from './TeamRow';
import requireGame from './requireGame';
import { teamNameChanged, addTeam, selectTeam, addTopics } from '../actions';

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
        selected={this.props.selectedTeam === team.uid}
        onClick={() => this.props.selectTeam(team.uid)}
      />
    ));
  }

  renderAddTopicsButton() {
    if (this.props.loading) {
      return <CircularProgress />;
    }

    return (
      <Button
        onClick={() => this.props.addTopics(this.props.history)}
        disabled={!this.props.addTopicsEnabled}
      >
        Next, Add Topics!
      </Button>
    );
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

        <span className="Or">OR</span>

        <div className="TeamNames">
          <div className="TeamNamesHeader">
            <span>Join Team:</span>
            <span># of players</span>
          </div>

          {this.renderTeams()}
        </div>

        {this.renderAddTopicsButton()}
      </div>
    );
  }
}

const teamsAndPlayerCounts = ({ teams, players }) => {
  const teamCounts = _.countBy(players, 'teamUid');
  const withPlayerCount = _.reduce(
    teams,
    (result, team, teamUid) => ({
      ...result,
      [teamUid]: { ...team, playerCount: teamCounts[teamUid] || 0 }
    }),
    {}
  );

  return _.map(withPlayerCount, (val, uid) => ({ ...val, uid }));
};

const selectedTeam = ({ players, playerUid }) => {
  const currentPlayer = players[playerUid];
  return (currentPlayer || {}).teamUid;
};

const mapStateToProps = ({ PickTeams, Game }) => ({
  teamName: PickTeams.teamName,
  addTeamEnabled: PickTeams.teamName,
  teams: teamsAndPlayerCounts(Game),
  selectedTeam: selectedTeam(Game),
  addTopicsEnabled: !!selectedTeam(Game)
});

export default connect(
  mapStateToProps,
  {
    teamNameChanged,
    addTeam,
    selectTeam,
    addTopics
  }
)(requireGame(PickTeamsComponent));
