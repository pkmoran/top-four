import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import _ from 'lodash';
import requireGame from './requireGame';
import { teamNameChanged, getTeams, addTeam } from '../actions';

import './styles/PickTeams.css';

class PickTeamsComponent extends Component {
  constructor(props) {
    super(props);

    this.teamNameChanged = this.teamNameChanged.bind(this);
  }

  componentDidMount() {
    this.props.getTeams();
  }

  teamNameChanged(event) {
    this.props.teamNameChanged(event.target.value);
  }

  renderTeams() {
    return this.props.teams.map(team => <li key={team.uid}>{team.name}</li>);
  }

  render() {
    return (
      <div className="PickTeams">
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
            disabled={this.props.addTeamEnabled}
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

const mapStateToProps = ({ PickTeams, Game }) => {
  const {
    teamName,
    addTeamEnabled
  } = PickTeams;

  const {
    teams
  } = Game;

  return {
    teamName,
    addTeamEnabled,
    teams: _.map(teams, (val, uid) => ({ ...val, uid }))
  };
};

export default connect(
  mapStateToProps,
  {
    teamNameChanged,
    getTeams,
    addTeam
  }
)(requireGame(PickTeamsComponent));
