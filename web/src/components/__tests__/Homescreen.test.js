import React from 'react';
import { mount } from 'enzyme';

import Button from '@material-ui/core/Button';

import Root from '../Root';
import GameId from '../GameId';
import Homescreen, { getTeams } from '../Homescreen';
import TeamSummary from '../TeamSummary';
import ChoiceDialog from '../ChoiceDialog';

let wrapped;
const INITIAL_STATE = {
  Game: {
    gameId: 'A9',
    gameUid: 'asdf',
    playerUid: 'player1',
    games: {
      asdf: {
        ranking: false
      }
    },
    players: {
      player1: {
        name: 'Player 1',
        teamUid: 'team1',
        score: 1
      },
      player2: {
        name: 'Player 2',
        teamUid: 'team1',
        score: 1
      },
      player3: {
        name: 'Player 3',
        teamUid: 'team2',
        score: 3
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
    expect(wrapped
      .find(GameId)
      .find('span')
      .at(1)
      .text()).toEqual('A9');
  });

  it('should have a header', () => {
    expect(wrapped.find('h1').text()).toEqual("Who's Up?");
  });

  it("should have a button called I'm up!", () => {
    expect(wrapped.find(Button).text()).toEqual("I'm Up!");
  });

  describe('the team summary', () => {
    it('should receive the correct name property', () => {
      const teams = wrapped.find(TeamSummary);

      expect(teams.length).toEqual(2);
      expect(teams.at(0).prop('name')).toEqual('Team 1');
      expect(teams.at(1).prop('name')).toEqual('Team 2');
    });

    it('should receive the correct players property', () => {
      const team1Players = wrapped.find(TeamSummary).at(0);
      const team2Players = wrapped.find(TeamSummary).at(1);

      expect(team1Players.prop('players').length).toEqual(2);
      expect(team1Players.prop('players')[0].name).toEqual('Player 1');
      expect(team1Players.prop('players')[1].name).toEqual('Player 2');

      expect(team2Players.prop('players').length).toEqual(1);
      expect(team2Players.prop('players')[0].name).toEqual('Player 3');
    });
  });

  it('should have a start round dialog', () => {
    expect(wrapped.find(ChoiceDialog).length).toEqual(1);
  });
});

describe('the start round dialog', () => {
  it('should receive the true open prop when the I\'m Up! button is pressed', () => {
    wrapped.find(Button).prop('onClick')();
    wrapped.update();

    expect(wrapped.find(ChoiceDialog).prop('open')).toEqual(true);
  });

  it('should receive the player name property', () => {
    expect(wrapped.find(ChoiceDialog).prop('contentText')).toEqual('Player 1, you\'re up! Is the group ready?');
  });
});

describe('getTeams', () => {
  it('should return the correct number of teams', () => {
    expect(getTeams(INITIAL_STATE.Game).length).toEqual(2);
  });

  it('should return all players assigned to their relevant teams', () => {
    const teams = getTeams(INITIAL_STATE.Game);

    expect(teams[0].players.length).toEqual(2);
    expect(teams[0].players[0].uid).toEqual('player1');
    expect(teams[0].players[1].uid).toEqual('player2');
    expect(teams[1].players.length).toEqual(1);
    expect(teams[1].players[0].uid).toEqual('player3');
  });

  it('should calculate the team aggregate score', () => {
    const teams = getTeams(INITIAL_STATE.Game);

    expect(teams[0].score).toEqual(2);
    expect(teams[1].score).toEqual(3);
  });
});
