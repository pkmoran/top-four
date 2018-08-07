import React from 'react';
import { mount } from 'enzyme';

import Button from '@material-ui/core/Button';

import Root from '../Root';
import GameId from '../GameId';
import Homescreen, { getTeamPlayers } from '../Homescreen';

let wrapped;
const INITIAL_STATE = {
  Game: {
    gameId: 'A9',
    players: {
      player1: {
        name: 'Player 1',
        teamUid: 'team1'
      },
      player2: {
        name: 'Player 2',
        teamUid: 'team1'
      },
      player3: {
        name: 'Player 3',
        teamUid: 'team2'
      }
    },
    teams: {
      team1: {
        name: 'Team 1'
      },
      team2: {
        name: 'Team 2'
      },
      team3: {
        name: 'Team 3'
      }
    }
  }
};

beforeEach(() => {
  wrapped = mount(<Root initialState={INITIAL_STATE}><Homescreen /></Root>);
});

afterEach(() => {
  wrapped.unmount();
});

describe('the interface', () => {
  it('should have the game ID header', () => {
    expect(wrapped.find(GameId).find('span').at(1).text()).toEqual('A9');
  });

  it('should have a header', () => {
    expect(wrapped.find('h1').text()).toEqual('Who\'s Up?');
  });

  it('should have a button called I\'m up!', () => {
    expect(wrapped.find(Button).text()).toEqual('I\'m Up!');
  });

  it('should list all the teams', () => {
    const teams = wrapped.find('.HomescreenTeam');

    expect(teams.length).toEqual(3);
    expect(teams.at(0).find('span').text()).toEqual('Team 1');
    expect(teams.at(1).find('span').text()).toEqual('Team 2');
    expect(teams.at(2).find('span').text()).toEqual('Team 3');
  });

  it('should list all the players by team', () => {
    const team1Players = wrapped.find('.HomescreenTeam').at(0).find('.HomescreenPlayer');
    const team2Players = wrapped.find('.HomescreenTeam').at(1).find('.HomescreenPlayer');

    expect(team1Players.length).toEqual(2);
    expect(team1Players.at(0).text()).toEqual('Player 1');
    expect(team1Players.at(1).text()).toEqual('Player 2');

    expect(team2Players.length).toEqual(1);
    expect(team2Players.at(0).text()).toEqual('Player 3');
  });
});

describe('getTeamPlayers', () => {
  it('should return players by their team', () => {
    const teamPlayers = getTeamPlayers(INITIAL_STATE.Game);

    expect(teamPlayers.team1.length).toEqual(2);
    expect(teamPlayers.team1[0].uid).toEqual('player1');
    expect(teamPlayers.team1[1].uid).toEqual('player2');

    expect(teamPlayers.team2.length).toEqual(1);
    expect(teamPlayers.team2[0].uid).toEqual('player3');

    expect(teamPlayers.team3.length).toEqual(0);
  });
});
