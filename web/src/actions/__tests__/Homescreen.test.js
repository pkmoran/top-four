import _ from 'lodash';
import sinon from 'sinon';

import { showStartRoundDialog, hideStartRoundDialog, randTopics, startRound } from '../Homescreen';
import { SHOW_START_ROUND_DIALOG, START_ROUND } from '../types';
import * as services from '../../services/Game';

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
  it('should return a dictionary with four topics', () => {
    const topicIds = Object.keys(randTopics(topics));
    const expectedTopicIds = Object.keys(topics);

    expect(topicIds.length).toEqual(4);
    _.forEach(topicIds, (id) => {
      expect(expectedTopicIds.includes(id)).toEqual(true);
    });
  });

  it('should only return topics that are available', () => {
    const usedTopics = _.find(randTopics(topics), topic => topic.status === 'used');
    expect(usedTopics).toEqual(undefined);
  });
});

describe('the startRound action', () => {
  let updateTopicService;
  let startRoundService;
  let dispatch;
  let getState;

  beforeEach(() => {
    updateTopicService = sinon.fake.yields();
    startRoundService = sinon.fake();
    dispatch = sinon.fake();
    getState = sinon.fake.returns({
      Game: {
        topics
      }
    });

    sinon.replace(services, 'updateTopicsService', updateTopicService);
    sinon.replace(services, 'startRoundService', startRoundService);

    startRound(updateTopicService)(dispatch, getState);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should dispatch the hide action', () => {
    const dispatchedAction = dispatch.firstCall.args[0];

    expect(dispatchedAction.type).toEqual(SHOW_START_ROUND_DIALOG);
    expect(dispatchedAction.payload).toEqual(false);
  });

  it('should call the update topics service with a plain object', () => {
    const topicsArg = updateTopicService.firstCall.args[0];

    expect(_.isPlainObject(topicsArg)).toEqual(true);
  });

  it('should update the status of 4 topics', () => {
    const topicsArg = updateTopicService.firstCall.args[0];

    expect(Object.keys(topicsArg).length).toEqual(4);
    _.forEach(topicsArg, (topic) => {
      expect(topic.status === 'active');
    });
  });

  it('should call the startRoundService', () => {
    expect(startRoundService.calledOnce).toEqual(true);
  });
});
