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

const getTeamIndex = (teams, player) =>
  teams && player && teams.findIndex(({ uid }) => uid === player.teamUid);

const Teams = ({ joinTeam, teams, player, playersByTeam }) => {
  const teamIndex = getTeamIndex(teams, player);

  const handleChange = (_, newTeamIndex) => {
    joinTeam(teams[newTeamIndex].uid);
  };

  return (
    <div class="teams">
      <div class="teams__logo">
        <Logo size="small" />
      </div>
      <div class="teams__container">
        <h2>Pick Teams!</h2>
        {teamIndex >= 0 && (
          <>
            <Tabs
              value={teamIndex}
              onChange={handleChange}
              textColor="primary"
              variant="fullWidth"
            >
              {teams.map(team => {
                const teamPlayers = playersByTeam[team.uid];
                const numPlayers = teamPlayers ? teamPlayers.length : 0;

                return <Tab label={`${team.name} (${numPlayers})`} />;
              })}
            </Tabs>
            <div class="teams__current-team">
              {playersByTeam[player.teamUid].map(teamPlayer => (
                <div
                  class="teams__player"
                  name={`${player.teamUid}_teamPlayer`}
                >
                  {`${teamPlayer.name}${
                    teamPlayer.uid === player.uid ? ' (You)' : ''
                  }`}
                </div>
              ))}
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

const wrappers = compose(
  withJoinTeamAction,
  withPlayerState,
  withPlayersByTeamState,
  withTeamsState,
  withTeamUidState,
  withPlayersByTeamState,
  withEffect
);

export { Teams };
export default wrappers(Teams);
