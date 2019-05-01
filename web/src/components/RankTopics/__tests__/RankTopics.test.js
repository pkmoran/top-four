import React from 'react';
import { mount } from 'enzyme';

import Root from '../../Root';
import RankTopics from '../RankTopics';
import GameId from '../../GameId';
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

const topics = [{
  uid: 'topic1',
  playerUid: 'player1',
  rank: -1,
  status: 'active',
  topic: 'topic 1'
}, {
  uid: 'topic2',
  playerUid: 'player1',
  rank: -1,
  status: 'active',
  topic: 'topic 2'
}, {
  uid: 'topic3',
  playerUid: 'player1',
  rank: -1,
  status: 'active',
  topic: 'topic 3'
}, {
  uid: 'topic4',
  playerUid: 'player1',
  rank: -1,
  status: 'active',
  topic: 'topic 4'
}]

beforeEach(() => {
  wrapped = mount(
    <RankTopics
      { ... {
        topics,
        active: true,
        showDialog: false,
        showRevealDialog: false
      }}
    />
  );
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
