import { updateMyRanks } from '../RankTopics';
import { UPDATE_MY_RANKS } from '../types';

const topics = [
  {
    uid: 'topic1',
    rank: -1,
    status: 'active',
    topic: 'topic 1'
  },
  {
    uid: 'topic2',
    rank: -1,
    status: 'active',
    topic: 'topic 2'
  },
  {
    uid: 'topic3',
    rank: -1,
    status: 'active',
    topic: 'topic 3'
  },
  {
    uid: 'topic4',
    rank: -1,
    status: 'active',
    topic: 'topic 4'
  }
];

it('should update local ranks', () => {
  const action = updateMyRanks(topics, 2, 3);
  const localRanks = action.payload;

  expect(action.type).toEqual(UPDATE_MY_RANKS);
  expect(localRanks.topic1).toEqual(0);
  expect(localRanks.topic2).toEqual(1);
  expect(localRanks.topic3).toEqual(3);
  expect(localRanks.topic4).toEqual(2);
});
