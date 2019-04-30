import { getTopics } from '../RankTopicsContainer';

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
      map: {
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
      },
      array: [{
        uid: 'topic1',
        playerUid: 'player1',
        rank: -1,
        status: 'active',
        topic: 'topic 1'
      }, {
        uid: 'topic2',
        playerUid: 'player1',
        rank: -1,
        status: 'available',
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
      }, {
        uid: 'topic5',
        playerUid: 'player1',
        rank: -1,
        status: 'active',
        topic: 'topic 5'
      }, {
        uid: 'topic6',
        playerUid: 'player1',
        rank: -1,
        status: 'available',
        topic: 'topic 6'
      }, {
        uid: 'topic7',
        playerUid: 'player1',
        rank: -1,
        status: 'used',
        topic: 'topic 7'
      }]
    }
  }
};

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