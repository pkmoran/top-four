import { playerTopics } from '../AddTopicsContainer';

const game = {
  playerUid: 'player1',
  topics: {
    topic1: {
      name: 'Topic 1',
      playerUid: 'player1'
    },
    topic2: {
      name: 'Topic 2',
      playerUid: 'player2'
    },
    topic3: {
      name: 'Topic 3',
      playerUid: 'player1'
    },
    array: [{
      uid: 'topic1',
      name: 'Topic 1',
      playerUid: 'player1'
    }, {
      uid: 'topic2',
      name: 'Topic 2',
      playerUid: 'player2'
    }, {
      uid: 'topic3',
      name: 'Topic 3',
      playerUid: 'player1'
    }]
  }
}

describe('The playerTopics function', () => {
  it('should return an array of only the player\'s topics', () => {
    const topics = playerTopics(game);

    expect(topics.length).toEqual(2);
    expect(topics[0].name).toEqual('Topic 1');
    expect(topics[1].name).toEqual('Topic 3');
  });
});