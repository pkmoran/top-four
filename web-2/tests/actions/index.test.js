import { addTopicService, updateGameService } from '@services';

jest.mock('@services', () => ({
  addTopicService: jest.fn(),
  updateGameService: jest.fn()
}));

import { addTopic, startRound, updateLocalRanks } from '@actions';

import { UPDATE_LOCAL_RANKS } from '@actions/types';

describe('game actions', () => {
  beforeEach(() => {
    addTopicService.mockClear();
    updateGameService.mockClear();
  });

  describe('addTopic', () => {
    it('calls addTopicService', () => {
      addTopic('road trips', {
        state: { gameUid: '12345', playerUid: 'abcde' }
      });

      expect(addTopicService).toHaveBeenCalledTimes(1);
      expect(addTopicService.mock.calls[0][0]).toEqual({
        topic: 'road trips',
        gameUid: '12345',
        playerUid: 'abcde'
      });
    });
  });

  describe('startRound', () => {
    it('calls updateGameService', () => {
      const topics = {
        '12345': { status: 'available' },
        '23456': { status: 'unavailable' },
        '34567': { status: 'available' },
        '45678': { status: 'available' },
        '56789': { status: 'available' },
        '67890': { status: 'available' }
      };

      startRound({
        state: { playerUid: 'abcde', gameUid: '98765', game: { topics } }
      });

      expect(updateGameService).toHaveBeenCalledTimes(1);
      expect(updateGameService.mock.calls[0][1]).toBe('98765');

      const game = updateGameService.mock.calls[0][0];
      const gameTopics = Object.keys(game.topics).map(uid => ({
        uid,
        ...game.topics[uid]
      }));

      expect(game.rankingPlayerUid).toBe('abcde');
      expect(game.state).toBe('ranking');
      expect(
        gameTopics.filter(({ status }) => status === 'active').length
      ).toBe(4);
    });
  });

  describe('updateLocalRanks', () => {
    it('reorders the sorted active topics', () => {
      const dispatch = jest.fn();
      const activeTopics = [
        { uid: '12345', name: 'topic a' },
        { uid: '23456', name: 'topic b' },
        { uid: '34567', name: 'topic c' },
        { uid: '45678', name: 'topic f' }
      ];

      updateLocalRanks(activeTopics, 3, 1, { dispatch });

      expect(dispatch).toHaveBeenCalledTimes(1);

      const dispatchedAction = dispatch.mock.calls[0][0];

      expect(dispatchedAction.type).toBe(UPDATE_LOCAL_RANKS);
      expect(dispatchedAction.payload).toEqual({
        '12345': 0,
        '45678': 1,
        '23456': 2,
        '34567': 3
      });
    });
  });
});
