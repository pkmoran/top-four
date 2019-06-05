jest.mock('../../services/Game');

import { updateGameService } from '../../services/Game';
import { updateMyRanks, endRound } from '../RankTopics';
import { UPDATE_MY_RANKS, SKIP_SCORE } from '../types';

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

describe('allPlayersLockedIn', () => {
  it('should return false if there are any players not locked in', () => {
    const players = [
      {
        lockedIn: true
      },
      {
        lockedIn: false
      }
    ];

    expect(require('../RankTopics').allPlayersLockedIn(players)).toBe(false);
  });

  it('should return true if all players are locked in', () => {
    const players = [
      {
        lockedIn: true
      },
      {
        lockedIn: true
      }
    ];

    expect(require('../RankTopics').allPlayersLockedIn(players)).toBe(true);
  });
});

describe('the endRound function', () => {
  let dispatch;
  let getState = jest.fn();

  beforeEach(() => {
    dispatch = jest.fn();
  });

  afterEach(() => {
    updateGameService.mockClear();
  });

  it('should dispatch the skip score action', () => {
    getState.mockReturnValueOnce(getStateMockReturnValue('team2'));

    endRound()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledTimes(1);

    const dispatchedAction = dispatch.mock.calls[0][0];

    expect(dispatchedAction.type).toBe(SKIP_SCORE);
  });

  it('should set the locked in property of the current player to false', () => {
    getState.mockReturnValueOnce(getStateMockReturnValue('team2'));

    endRound()(dispatch, getState);

    const gameUpdate = updateGameService.mock.calls[0][0];

    expect(gameUpdate.players.player1.lockedIn).toBe(false);
  });

  it('should set the ranking team UID to the next one', () => {
    getState.mockReturnValueOnce(getStateMockReturnValue('team2'));

    endRound()(dispatch, getState);

    const gameUpdate = updateGameService.mock.calls[0][0];

    expect(gameUpdate.rankingTeamUid).toBe('team3');
  });

  it('should wrap back to team 1 if the last team is currently up', () => {
    getState = jest.fn().mockReturnValueOnce(getStateMockReturnValue('team3'));

    endRound()(dispatch, getState);

    const gameUpdate = updateGameService.mock.calls[0][0];

    expect(gameUpdate.rankingTeamUid).toBe('team1');
  });
});

const getStateMockReturnValue = rankingTeamUid => ({
  Game: {
    playerUid: 'player1',
    rankingTeamUid,
    teams: {
      array: [
        {
          uid: 'team1'
        },
        {
          uid: 'team2'
        },
        {
          uid: 'team3'
        }
      ]
    },
    topics: {
      map: {}
    },
    players: {
      map: { player1: { lockedIn: true } }
    }
  }
});
