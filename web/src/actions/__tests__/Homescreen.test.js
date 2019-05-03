import forEach from 'lodash/forEach';

import { showStartRoundDialog, hideStartRoundDialog, randTopicIds } from '../Homescreen';
import { SHOW_START_ROUND_DIALOG } from '../types';

let topics;

beforeEach(() => {
  topics = {
    topic1: {
      playerUid: 'player1',
      rank: -1,
      status: 'available',
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
      status: 'available',
      topic: 'topic 3'
    },
    topic4: {
      playerUid: 'player1',
      rank: -1,
      status: 'available',
      topic: 'topic 4'
    },
    topic5: {
      playerUid: 'player1',
      rank: -1,
      status: 'available',
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
  };
});

it('should dispatch a show action', () => {
  const action = showStartRoundDialog();
  expect(action.type).toEqual(SHOW_START_ROUND_DIALOG);
  expect(action.payload).toEqual(true);
});

it('should dispatch a hide action', () => {
  const action = hideStartRoundDialog();
  expect(action.type).toEqual(SHOW_START_ROUND_DIALOG);
  expect(action.payload).toEqual(false);
});

describe('the randTopics action', () => {
  it('should return an array with 4 ids', () => {
    const topicIds = randTopicIds(topics);
    const expectedTopicIds = Object.keys(topics);

    expect(topicIds.length).toEqual(4);
    forEach(topicIds, (id) => {
      expect(expectedTopicIds.includes(id)).toEqual(true);
    });
  });
});
