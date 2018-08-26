import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Button from '@material-ui/core/Button';

import requireGame from './requireGame';
import GameId from './GameId';
import TeamSummary from './TeamSummary';
import StartRoundDialog from './StartRoundDialog';

import { showStartRoundDialog, hideStartRoundDialog, startRound, startRanking } from '../actions';

import './styles/Homescreen.css';

class HomescreenComponent extends Component {
  componentDidMount() {
    if (this.props.ranking) {
      this.props.startRanking(this.props.history);
    }
  }

  componentDidUpdate() {
    if (this.props.ranking) {
      this.props.startRanking(this.props.history);
    }
  }

  renderTeams() {
    return this.props.teams.map(({
      uid, name, score, players
    }) => (
      <TeamSummary key={uid} name={name} score={score} players={players} />
    ));
  }

  render() {
    return (
      <div className="Homescreen">
        <GameId />

        <h1>Who&apos;s Up?</h1>

        <Button onClick={this.props.showStartRoundDialog}>I&apos;m Up!</Button>

        {this.renderTeams()}

        <StartRoundDialog
          open={this.props.showDialog}
          playerName={this.props.playerName}
          onYes={this.props.startRound}
          onNo={this.props.hideStartRoundDialog}
        />
      </div>
    );
  }
}

export const getTeams = ({ teams, players }) => {
  const teamUidsWithPlayers = _.uniq(_.map(players, ({ teamUid }) => teamUid));
  const teamsWithPlayers = {};

  _.forEach(teamUidsWithPlayers, (teamUid) => {
    teamsWithPlayers[teamUid] = { ...teams[teamUid], players: [], score: 0 };
  });

  _.forEach(players, (player, uid) => {
    const team = teamsWithPlayers[player.teamUid];
    team.players.push({ ...player, uid });
    team.score += player.score || 0;
  });

  return _.map(teamsWithPlayers, (team, uid) => ({ ...team, uid }));
};

const mapStateToProps = ({ Game, Homescreen }) => ({
  teams: getTeams(Game),
  showDialog: Homescreen.showDialog,
  playerName: (_.find(Game.players, (player, uid) => uid === Game.playerUid) || {}).name,
  ranking: ((Game.games || {})[Game.gameUid] || {}).ranking
});

export default connect(
  mapStateToProps,
  {
    showStartRoundDialog,
    hideStartRoundDialog,
    startRound,
    startRanking
  }
)(requireGame(HomescreenComponent));
