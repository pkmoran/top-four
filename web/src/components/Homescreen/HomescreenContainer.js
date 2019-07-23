import React, { Component } from 'react';
import { connect } from 'react-redux';
import reduce from 'lodash/reduce';
import filter from 'lodash/filter';
import find from 'lodash/find';

import { pageView } from '../../services/analytics';

import Homescreen from './Homescreen';
import requireGame from '../requireGame';

import { SINGLE_TEAM_UID } from '../../constants';

import {
  showStartRoundDialog,
  hideStartRoundDialog,
  startRound,
  watchGameStateForHomescreen,
  stopWatchingGameStateForHomescreen
} from '../../actions';

class HomeScreenContainer extends Component {
  componentDidMount() {
    pageView('/homescreen');
    
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
      remainingRounds,
      roundsPlayed,
      rankingTeamUid,
      teamUid,
      rankingTeamName
    } = this.props;

    return (
      <Homescreen
        {...{
          gameId,
          teams,
          showDialog,
          playerName,
          ranking,
          gameOver,
          showStartRoundDialog,
          hideStartRoundDialog,
          startRound,
          remainingRounds,
          roundsPlayed,
          rankingTeamUid,
          teamUid,
          rankingTeamName
        }}
      />
    );
  }
}

export const getTeams = ({ teams, players, noTeams }) => {
  let adjustedTeams;

  if (noTeams) {
    adjustedTeams = [
      {
        uid: SINGLE_TEAM_UID,
        name: 'Players'
      }
    ];
  } else {
    adjustedTeams = teams.array;
  }

  return reduce(
    adjustedTeams,
    (result, team) => {
      const teamPlayers =
        team.uid === SINGLE_TEAM_UID
          ? players.array
          : filter(players.array, { teamUid: team.uid });
      const numPlayers = teamPlayers.length;

      if (numPlayers > 0) {
        const totalScore = reduce(
          teamPlayers,
          (sum, player) => sum + player.score,
          0
        );
        const averageScore = totalScore / numPlayers;
        const score = Math.round(averageScore * 100) / 100;

        result.push({
          ...team,
          players: teamPlayers,
          score
        });
      }

      return result;
    },
    []
  );
};

const mapStateToProps = ({ Game, Homescreen }) => ({
  gameId: Game.gameId,
  teams: getTeams(Game),
  showDialog: Homescreen.showDialog,
  playerName: (
    find(Game.players.map, (player, uid) => uid === Game.playerUid) || {}
  ).name,
  ranking: !!Game.rankingPlayerUid,
  gameOver: filter(Game.topics.array, { status: 'available' }).length < 4,
  remainingRounds: Math.floor(
    filter(Game.topics.array, { status: 'available' }).length / 4
  ),
  roundsPlayed: filter(Game.topics.array, { status: 'unavailable' }).length / 4,
  rankingTeamUid: Game.rankingTeamUid,
  rankingTeamName: Game.noTeams
    ? undefined
    : Game.teams.map[Game.rankingTeamUid].name,
  teamUid: Game.players.map[Game.playerUid].teamUid
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
