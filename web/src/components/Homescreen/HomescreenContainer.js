import React, { Component } from 'react';
import { connect } from 'react-redux';
import reduce from 'lodash/reduce';
import filter from 'lodash/filter';
import find from 'lodash/find';

import Homescreen from './Homescreen';
import requireGame from '../requireGame';

import {
  showStartRoundDialog,
  hideStartRoundDialog,
  startRound,
  watchGameStateForHomescreen,
  stopWatchingGameStateForHomescreen
} from '../../actions';

class HomeScreenContainer extends Component {

  componentDidMount() {
    this.props.watchGameStateForHomescreen(this.props.history);
  }

  componentWillUnmount() {
    this.props.stopWatchingGameStateForHomescreen();
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
      startRound,
      remainingRounds
    } = this.props;

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
          remainingRounds
        }}
      />
    )
  }
}

export const getTeams = ({ teams, players }) => {
  return reduce(teams.array, (result, team) => {
    const teamPlayers = filter(players.array, { 'teamUid': team.uid });

    if (teamPlayers.length > 0) {
      result.push({
        ...team,
        players: teamPlayers,
        score: reduce(teamPlayers, (sum, player) => sum + player.score, 0)
      });
    }

    return result;
  }, []);
};

const mapStateToProps = ({ Game, Homescreen }) => ({
  gameId: Game.gameId,
  teams: getTeams(Game),
  showDialog: Homescreen.showDialog,
  playerName: (find(Game.players.map, (player, uid) => uid === Game.playerUid) || {}).name,
  ranking: !!Game.rankingPlayerUid,
  gameOver: filter(Game.topics.array, { status: 'available' }).length < 4,
  remainingRounds: Math.floor(filter(Game.topics.array, { status: 'available' }).length / 4)
});

export default connect(
  mapStateToProps,
  {
    showStartRoundDialog,
    hideStartRoundDialog,
    startRound,
    watchGameStateForHomescreen,
    stopWatchingGameStateForHomescreen
  }
)(requireGame(HomeScreenContainer));