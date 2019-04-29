import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Homescreen from './Homescreen';
import requireGame from '../requireGame';

import {
  showStartRoundDialog,
  hideStartRoundDialog,
  startRound,
  startRanking
} from '../../actions';

class HomeScreenContainer extends Component {
  constructor(props) {
    super(props);

    this.startRanking = this.startRanking.bind(this);
  }

  startRanking() {
    this.props.startRanking(this.props.history);
  }

  render() {
    const {
      gameId,
      teams,
      showDialog,
      playerName,
      ranking,
      gameOver,
      showStartRoundDialog,
      hideStartRoundDialog,
      startRound
    } = this.props;

    const {
      startRanking
    } = this;

    return (
      <Homescreen 
        { ... {
          gameId,
          teams,
          showDialog,
          playerName,
          ranking,
          gameOver,
          showStartRoundDialog,
          hideStartRoundDialog,
          startRound,
          startRanking
        }}
      />
    )
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
  gameId: Game.gameId,
  teams: getTeams(Game),
  showDialog: Homescreen.showDialog,
  playerName: (_.find(Game.players, (player, uid) => uid === Game.playerUid) || {}).name,
  ranking: !!((Game.games || {})[Game.gameUid] || {}).rankingPlayerUid,
  gameOver: _.filter(Game.topics, topic => topic.status === 'available').length < 4
});

export default connect(
  mapStateToProps,
  {
    showStartRoundDialog,
    hideStartRoundDialog,
    startRound,
    startRanking
  }
)(requireGame(HomeScreenContainer));