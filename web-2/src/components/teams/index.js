import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Button, Tabs, Tab } from '@material-ui/core';

import compose from 'utilities/compose';
import {
  teamsToArray,
  playersToPlayersByTeam,
  toPlayer
} from 'utilities/state_mapping';
import withRouter, { toAddTopics, toGame } from 'utilities/router';

import { withAction, withState } from 'state/game';
import { joinTeam } from 'actions/game';

import Logo from 'components/shared/logo';
import Team from 'components/teams/team';

const Teams = ({
  joinTeam,
  teamsWithPlayers: [team1, team2],
  playerTeamIndex,
  nextButton
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

            {nextButton}
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
const withTopicPackState = withState('game.topicPack', 'topicPack');

const composedState = compose(
  withPlayerState,
  withTeamsState,
  withTeamUidState,
  withPlayersByTeamState,
  withTopicPackState
);

// routes
const withRoutes = withRouter(toAddTopics, toGame);

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
    const {
      teams,
      playersByTeam,
      player,
      topicPack,
      routes: [toAddTopics, toGame]
    } = props;

    const teamsWithPlayers = teams.map(team => ({
      ...team,
      players: playersByTeam[team.uid] || []
    }));

    const playerTeamIndex =
      teams && player && teams.findIndex(({ uid }) => uid === player.teamUid);

    let nextButton;
    if (!topicPack) {
      nextButton = (
        <Button variant="contained" color="primary" onClick={toAddTopics}>
          Add Topics
        </Button>
      );
    } else {
      nextButton = (
        <Button variant="contained" color="primary" onClick={toGame}>
          Done!
        </Button>
      );
    }

    return (
      <WrappedComponent
        {...props}
        teamsWithPlayers={teamsWithPlayers}
        playerTeamIndex={playerTeamIndex}
        nextButton={nextButton}
      />
    );
  };
};

const wrappers = compose(
  withJoinTeamAction,
  composedState,
  withEffect,
  withPropsCombiner,
  withRoutes
);

export { withPropsCombiner, Teams };
export default wrappers(Teams);
