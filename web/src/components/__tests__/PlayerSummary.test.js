import React from 'react';
import { mount } from 'enzyme';

import PlayerSummary from '../PlayerSummary';

let wrapped;

beforeEach(() => {
  wrapped = mount(<PlayerSummary
    player={{
        name: 'Player 1',
        score: 3
      }}
  />);
});

afterEach(() => {
  wrapped.unmount();
});

it('should display the player name', () => {
  expect(wrapped
    .find('li')
    .at(0)
    .text()).toEqual('Player 1');
});

it('should display the player score', () => {
  expect(wrapped
    .find('span')
    .at(0)
    .text()).toEqual('3');
});
