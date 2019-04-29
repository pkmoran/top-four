import React from 'react';
import { mount } from 'enzyme';

import Button from '@material-ui/core/Button';

import GameId from '../../GameId';
import Homescreen from '../Homescreen';
import TeamSummary from '../TeamSummary';
import ChoiceDialog from '../../ChoiceDialog';

let wrapped;

const teams = [{
  uid: 'team1',
  name: 'Team 1',
  players: [{
    uid: 'player1',
    name: 'Player 1'
  }, {
    uid: 'player2',
    name: 'Player 2'
  }]
}, {
  uid: 'team2',
  name: 'Team 2',
  players: [{
    uid: 'player3',
    name: 'Player 3'
  }]
}];

beforeEach(() => {
  wrapped = mount(
    <Homescreen
      {... {
        gameId: 'A9',
        teams,
        showDialog: false,
        showStartRoundDialog: () => wrapped.setProps({ showDialog: true }),
        playerName: 'Player 1'
      }}
    />
  );
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
