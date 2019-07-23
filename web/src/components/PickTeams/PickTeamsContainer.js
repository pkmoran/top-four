import React, { Component } from 'react';
import { connect } from 'react-redux';
import countBy from 'lodash/countBy';
import map from 'lodash/map';

import { pageView } from '../../services/analytics';

import PickTeams from './PickTeams';
import requireGame from '../requireGame';

import { selectTeam, addTopics, done } from '../../actions';

class PickTeamsContainer extends Component {
  constructor(props) {
    super(props);

    this.actionButtonClicked = this.actionButtonClicked.bind(this);
  }

  componentDidMount() {
    pageView('/pickTeams');
  }

  actionButtonClicked() {
    const { topicPack, addTopics, done, history } = this.props;

    if (topicPack) {
      done(history);
    } else {
      addTopics(history);
    }
  }

  render() {
    const {
      gameId,
      teams,
      selectedTeam,
      actionButtonEnabled,
      selectTeam,
      topicPack
    } = this.props;

    const { actionButtonClicked } = this;

    const actionButtonTitle = topicPack ? 'Done!' : 'Next, Add Topics!';

    return (
      <PickTeams
        {...{
          gameId,
          teams,
          selectedTeam,
          actionButtonEnabled,
          selectTeam,
          actionButtonTitle,
          actionButtonClicked
        }}
      />
    );
  }
}

export const teamsAndPlayerCounts = ({ teams, players }) => {
  const teamCounts = countBy(players.map, 'teamUid');

  return map(teams.array, team => ({
    ...team,
    playerCount: teamCounts[team.uid] || 0
  }));
};

const selectedTeam = ({ players, playerUid }) => {
  const currentPlayer = players.map[playerUid];
  return (currentPlayer || {}).teamUid;
};

const mapStateToProps = ({ Game }) => ({
  gameId: Game.gameId,
  teams: teamsAndPlayerCounts(Game),
  selectedTeam: selectedTeam(Game),
  actionButtonEnabled: !!selectedTeam(Game),
  topicPack: Game.topicPack
});

export default connect(
  mapStateToProps,
  {
    selectTeam,
    addTopics,
    done
  }
)(requireGame(PickTeamsContainer));
