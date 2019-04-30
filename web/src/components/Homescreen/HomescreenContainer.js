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
        {... {
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
  return _.reduce(teams.array, (result, team) => {
    const teamPlayers = _.filter(players.array, { 'teamUid': team.uid });

    if (teamPlayers.length > 0) {
      result.push({
        ...team,
        players: teamPlayers,
        score: _.reduce(teamPlayers, (sum, player) => sum + player.score, 0)
      });
    }

    return result;
  }, []);
};

const mapStateToProps = ({ Game, Homescreen }) => ({
  gameId: Game.gameId,
  teams: getTeams(Game),
  showDialog: Homescreen.showDialog,
  playerName: (_.find(Game.players.map, (player, uid) => uid === Game.playerUid) || {}).name,
  ranking: !!Game.rankingPlayerUid,
  gameOver: _.filter(Game.topics.array, topic => topic.status === 'available').length < 4
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