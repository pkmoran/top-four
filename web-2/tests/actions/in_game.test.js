import { updateGameService, lockInService } from '@services';

jest.mock('@services', () => ({
  updateGameService: jest.fn(),
  lockInService: jest.fn()
}));

import { startRound, updateLocalRanks, lockIn } from '@actions/in_game';

import { UPDATE_LOCAL_RANKS } from '@actions/types';

describe('in game actions', () => {
  beforeEach(() => {
    updateGameService.mockClear();
    lockInService.mockClear();
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

  describe('lockIn', () => {
    it('calls lockInService with guesses for a ranking player', () => {
      const localRanks = {
        '12345': 0,
        '23456': 1,
        '34567': 2,
        '45678': 3
      };

      lockIn({
        state: {
          gameUid: 'abcde',
          playerUid: 'bcdef',
          localRanks,
          game: { rankingPlayerUid: 'bcdef' }
        }
      });

      expect(lockInService).toHaveBeenCalledTimes(1);
      expect(lockInService.mock.calls[0][0]).toEqual({
        gameUid: 'abcde',
        playerUid: 'bcdef',
        guesses: {
          '12345': 'active',
          '23456': 'active',
          '34567': 'active',
          '45678': 'active'
        }
      });
    });

    it('calls lockInService with guesses for a guessing player', () => {
      const localRanks = {
        '12345': 0,
        '23456': 1,
        '34567': 2,
        '45678': 3
      };

      lockIn({
        state: {
          gameUid: 'abcde',
          playerUid: 'bcdef',
          localRanks,
          game: { rankingPlayerUid: '98765' }
        }
      });

      expect(lockInService).toHaveBeenCalledTimes(1);
      expect(lockInService.mock.calls[0][0]).toEqual({
        gameUid: 'abcde',
        playerUid: 'bcdef',
        guesses: {
          '12345': 0,
          '23456': 1,
          '34567': 2,
          '45678': 3
        }
      });
    });
  });
});
