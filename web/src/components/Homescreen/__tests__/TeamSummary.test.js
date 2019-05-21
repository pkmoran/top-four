import React from 'react';
import { mount } from 'enzyme';

import TeamSummary from '../TeamSummary';
import PlayerSummary from '../PlayerSummary';

let wrapped;

beforeEach(() => {
  wrapped = mount(<TeamSummary
    name="Team 1"
    score="5"
    players={{
        player1: {
          name: 'Player 1',
          score: 3
        },
        player2: {
          name: 'Player 2',
          score: 2
        }
      }}
  />);
});

afterEach(() => {
  wrapped.unmount();
});

describe('the player summary', () => {
  it('should receive the correct player property', () => {
    const players = wrapped.find(PlayerSummary);

    expect(players.length).toEqual(2);
    expect(players.at(0).prop('player').name).toEqual('Player 1');
    expect(players.at(0).prop('player').score).toEqual(3);
    expect(players.at(1).prop('player').name).toEqual('Player 2');
    expect(players.at(1).prop('player').score).toEqual(2);
  });
});

it('should display the team name', () => {
  expect(wrapped
    .find('span')
    .at(0)
    .text()).toEqual('Team 1 average score');
});

it('should display all the players', () => {
  const players = wrapped.find('li');

  expect(players.at(0).text()).toEqual('Player 1');
  expect(players.at(1).text()).toEqual('Player 2');
});

it('should display the team score', () => {
  expect(wrapped
    .find('span')
    .at(1)
    .text()).toEqual('5');
});
