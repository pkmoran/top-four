import React from 'react';
import { mount } from 'enzyme';

import Root from '../Root';
import RankTopics, { getTopics } from '../RankTopics';
import GameId from '../GameId';
import DraggableTopics from '../DraggableTopics';

let wrapped;
const INITIAL_STATE = {
  Game: {
    gameUid: 'asdf',
    playerUid: 'player1',
    games: {
      asdf: {
        rankingPlayerUid: 'player1'
      }
    },
    players: {},
    topics: {
      topic1: {
        playerUid: 'player1',
        rank: -1,
        status: 'active',
        topic: 'topic 1'
      },
      topic2: {
        playerUid: 'player1',
        rank: -1,
        status: 'available',
        topic: 'topic 2'
      },
      topic3: {
        playerUid: 'player1',
        rank: -1,
        status: 'active',
        topic: 'topic 3'
      },
      topic4: {
        playerUid: 'player1',
        rank: -1,
        status: 'active',
        topic: 'topic 4'
      },
      topic5: {
        playerUid: 'player1',
        rank: -1,
        status: 'active',
        topic: 'topic 5'
      },
      topic6: {
        playerUid: 'player1',
        rank: -1,
        status: 'available',
        topic: 'topic 6'
      },
      topic7: {
        playerUid: 'player1',
        rank: -1,
        status: 'used',
        topic: 'topic 7'
      }
    }
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

  it('should have a DraggableTopics', () => {
    expect(wrapped.find(DraggableTopics).length).toEqual(1);
  });

  it('should display the ranker text', () => {
    expect(wrapped.find('span').at(2).text()).toEqual('Put the following topics in order from best to worst');
  });
});

describe('getTopics', () => {
  const localRanks = {
    topic1: 0,
    topic3: 2,
    topic4: 1,
    topic5: 3
  };

  it('should return the active topics', () => {
    const activeTopics = getTopics(INITIAL_STATE.Game.topics, localRanks);
    expect(activeTopics.length).toEqual(4);
  });

  it('should sort the topics by their local rank', () => {
    const rankedTopics = getTopics(INITIAL_STATE.Game.topics, localRanks);

    expect(rankedTopics[0].uid).toEqual('topic1');
    expect(rankedTopics[1].uid).toEqual('topic4');
    expect(rankedTopics[2].uid).toEqual('topic3');
    expect(rankedTopics[3].uid).toEqual('topic5');
  });
});
