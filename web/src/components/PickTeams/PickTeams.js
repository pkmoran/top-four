import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import GameId from '../GameId';
import TeamRow from './TeamRow';

import './styles/PickTeams.css';

class PickTeamsComponent extends Component {
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
        onClick={() => this.props.addTopics()}
        disabled={!this.props.addTopicsEnabled}
      >
        Next, Add Topics!
      </Button>
    );
  }

  render() {
    return (
      <div className="PickTeams">
        <GameId gameId={this.props.gameId}/>

        <h1>Pick Teams!</h1>

        <div>
          <TextField
            onChange={this.props.teamNameChanged}
            value={this.props.teamName}
            id="teamName"
            label="Team Name"
            placeholder="e.g. Voldemort"
          />

          <Button
            onClick={() => this.props.addTeam()}
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

export default PickTeamsComponent;
