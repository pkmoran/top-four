import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import PickTeams from './PickTeams';
import requireGame from '../requireGame';

import { selectTeam, addTopics } from '../../actions';

class PickTeamsContainer extends Component {
  constructor(props) {
    super(props);

    this.addTopics = this.addTopics.bind(this);
  }

  addTopics() {
    this.props.addTopics(this.props.history);
  }

  render() {
    const {
      gameId,
      teams,
      selectedTeam,
      addTopicsEnabled,
      selectTeam
    } = this.props;

    const {
      addTopics
    } = this;

    return (
      <PickTeams 
        { ... {
          gameId,
          teams,
          selectedTeam,
          addTopicsEnabled,
          selectTeam,
          addTopics
        }}
      />
    )
  }
}

export const teamsAndPlayerCounts = ({ teams, players }) => {
  const teamCounts = _.countBy(players.map, 'teamUid');
  
  return _.map(teams.array, team => ({ ...team, playerCount: teamCounts[team.uid] || 0 }));
};

const selectedTeam = ({ players, playerUid }) => {
  const currentPlayer = players.map[playerUid];
  return (currentPlayer || {}).teamUid;
};

const mapStateToProps = ({ Game }) => ({
  gameId: Game.gameId,
  teams: teamsAndPlayerCounts(Game),
  selectedTeam: selectedTeam(Game),
  addTopicsEnabled: !!selectedTeam(Game)
});

export default connect(
  mapStateToProps,
  {
    selectTeam,
    addTopics
  }
)(requireGame(PickTeamsContainer));