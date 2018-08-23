import React from 'react';
import { mount } from 'enzyme';

import Root from '../Root';
import RankTopics from '../RankTopics';
import GameId from '../GameId';

let wrapped;
const INITIAL_STATE = {
  Game: {
    gameUid: 'asdf'
  }
};

beforeEach(() => {
  wrapped = mount(<Root initialState={INITIAL_STATE}>
    <RankTopics />
                  </Root>);
});

afterEach(() => {
  wrapped.unmount();
});

describe('the interface', () => {
  it('should have the game ID header', () => {
    expect(wrapped.find(GameId).length).toEqual(1);
  });

  it('should have a header', () => {
    expect(wrapped.find('h1').text()).toEqual("Let's Rank!");
  });
});
