import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Tabs, Tab } from '@material-ui/core';

import compose from 'utilities/compose';
import {
  teamsToArray,
  playersToPlayersByTeam,
  toPlayer
} from 'utilities/state_mapping';

import { withAction, withState } from 'state/game';
import { joinTeam } from 'actions/game';

import Logo from 'components/shared/logo';
import Team from 'components/teams/team';

const Teams = ({
  joinTeam,
  teamsWithPlayers: [team1, team2],
  playerTeamIndex
}) => {
  const handleChange = (_, newTeamIndex) => {
    joinTeam(newTeamIndex === 0 ? team1.uid : team2.uid);
  };

  return (
    <div class="teams">
      <div class="teams__logo">
        <Logo size="small" />
      </div>
      <div class="teams__container">
        <h2>Pick Teams!</h2>
        {playerTeamIndex >= 0 && (
          <>
            <Tabs
              value={playerTeamIndex}
              onChange={handleChange}
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label={`${team1.name} (${team1.players.length})`} />
              <Tab label={`${team2.name} (${team2.players.length})`} />
            </Tabs>
            <div class="teams__teams">
              <Team players={team1.players} alignment="left" />
              <Team players={team2.players} alignment="right" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// actions
const withJoinTeamAction = withAction(joinTeam, 'joinTeam');

// state
const withPlayerState = withState(null, 'player', toPlayer);
const withTeamsState = withState('game.teams', 'teams', teamsToArray);
const withTeamUidState = withState('teamUid', 'teamUid');
const withPlayersByTeamState = withState(
  'game.players',
  'playersByTeam',
  playersToPlayersByTeam
);

// effects
const withEffect = WrappedComponent => {
  return props => {
    useEffect(() => {
      const { player, teams, joinTeam } = props;

      if (!player) return;

      if (!player.teamUid && teams) {
        joinTeam(teams[0].uid);
      }
    }, [props.teams, props.teamUid]);

    return <WrappedComponent {...props} />;
  };
};

const withPropsCombiner = WrappedComponent => {
  return props => {
    const { teams, playersByTeam, player } = props;

    const teamsWithPlayers = teams.map(team => ({
      ...team,
      players: playersByTeam[team.uid] || []
    }));

    const playerTeamIndex =
      teams && player && teams.findIndex(({ uid }) => uid === player.teamUid);

    return (
      <WrappedComponent
        {...props}
        teamsWithPlayers={teamsWithPlayers}
        playerTeamIndex={playerTeamIndex}
      />
    );
  };
};

const wrappers = compose(
  withJoinTeamAction,
  withPlayerState,
  withPlayersByTeamState,
  withTeamsState,
  withTeamUidState,
  withPlayersByTeamState,
  withEffect,
  withPropsCombiner
);

export { Teams };
export default wrappers(Teams);
