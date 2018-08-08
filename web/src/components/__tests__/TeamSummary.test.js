import React from 'react';
import { mount } from 'enzyme';

import TeamSummary from '../TeamSummary';

let wrapped;

beforeEach(() => {
  wrapped = mount(<TeamSummary
    name="Team 1"
    players={{
      player1: {
        name: 'Player 1'
      },
      player2: {
        name: 'Player 2'
      }
    }}
  />);
});

afterEach(() => {
  wrapped.unmount();
});

it('should display the team name', () => {
  expect(wrapped.find('span').text()).toEqual('Team 1');
});

it('should display all the players', () => {
  const players = wrapped.find('li');

  expect(players.at(0).text()).toEqual('Player 1');
  expect(players.at(1).text()).toEqual('Player 2');
});
