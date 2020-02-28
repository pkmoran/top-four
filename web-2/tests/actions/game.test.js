import { route } from 'preact-router';
import {
  getTopicPacksService,
  addPlayerService,
  startGameService
} from 'services/game';

jest.mock('preact-router', () => ({
  route: jest.fn()
}));

jest.mock('services/game', () => ({
  getTopicPacksService: jest.fn(),
  addPlayerService: jest.fn(),
  startGameService: jest.fn()
}));

import { startGame, getTopicPacks, addPlayer } from 'actions/game';
import { TOPIC_PACKS, STARTED_GAME } from 'actions/types';
import { TEAMS, INDIVIDUALS, WRITE_OUR_OWN_UID } from 'utilities/constants';

describe('game actions', () => {
  beforeEach(() => {
    getTopicPacksService.mockClear();
    addPlayerService.mockClear();
    startGameService.mockClear();
  });

  describe('getTopicPacks', () => {
    it('calls getTopicPacksService', () => {
      getTopicPacksService.mockResolvedValue([42]);

      getTopicPacks({ state: {}, dispatch: () => {} });

      expect(getTopicPacksService).toHaveBeenCalledTimes(1);
    });

    it('dispatches the topic packs action on success', async () => {
      getTopicPacksService.mockResolvedValue([42]);
      const dispatch = jest.fn();

      await getTopicPacks({ state: {}, dispatch });

      expect(dispatch).toHaveBeenCalledTimes(1);

      const dispatchedAction = dispatch.mock.calls[0][0];

      expect(dispatchedAction.type).toBe(TOPIC_PACKS);
      expect(dispatchedAction.payload).toEqual([42]);
    });

    it('does not call getTopicPacksService if topic packs already exist', () => {
      getTopicPacksService.mockResolvedValue(42);

      getTopicPacks({ state: { topicPacks: [42] } });

      expect(getTopicPacksService).not.toHaveBeenCalled();
    });
  });

  describe('addPlayer', () => {
    it('calls addPlayerService with the gameUid and name', async () => {
      addPlayerService.mockResolvedValue('12345');
      const player = {
        gameUid: 'qwerty',
        name: 'darth vader'
      };

      const playerUid = await addPlayer(player);

      expect(addPlayerService).toHaveBeenCalledTimes(1);
      expect(addPlayerService.mock.calls[0][0]).toEqual(player);
      expect(playerUid).toBe('12345');
    });
  });

  describe('startGame', () => {
    it('calls startGameService for teams and topic pack', () => {
      startGameService.mockResolvedValue();

      startGame({ name: 'andrew', gameMode: TEAMS, topicPackUid: '12345' }, {});

      expect(startGameService).toHaveBeenCalledTimes(1);
      expect(startGameService.mock.calls[0][0]).toEqual({
        numberOfTeams: 2,
        topicPackUid: '12345'
      });
    });

    it('calls startGameService for individuals and no topic pack', () => {
      startGameService.mockResolvedValue();

      startGame(
        {
          name: 'andrew',
          gameMode: INDIVIDUALS,
          topicPackUid: WRITE_OUR_OWN_UID
        },
        {}
      );

      expect(startGameService).toHaveBeenCalledTimes(1);
      expect(startGameService.mock.calls[0][0]).toEqual({
        numberOfTeams: 1,
        topicPackUid: null
      });
    });

    it('adds the player when the game is successfully created', async () => {
      startGameService.mockResolvedValue({ gameId: 'A6', gameUid: '12345' });
      addPlayerService.mockResolvedValue();

      await startGame({ name: 'andrew' }, {});

      expect(addPlayerService).toHaveBeenCalledTimes(1);
      expect(addPlayerService.mock.calls[0][0]).toEqual({
        gameUid: '12345',
        name: 'andrew'
      });
    });

    it('dispatches the started game action and routes on success', async () => {
      startGameService.mockResolvedValue({ gameId: 'A6', gameUid: '12345' });
      addPlayerService.mockResolvedValue('98765');
      const dispatch = jest.fn();

      await startGame({ name: 'andrew' }, { dispatch });

      expect(dispatch).toHaveBeenCalledTimes(1);

      const dispatchedAction = dispatch.mock.calls[0][0];

      expect(dispatchedAction.type).toBe(STARTED_GAME);
      expect(dispatchedAction.payload).toEqual({
        gameId: 'A6',
        gameUid: '12345',
        playerUid: '98765',
        name: 'andrew'
      });

      expect(route).toHaveBeenCalledTimes(1);
      expect(route.mock.calls[0][0]).toBe('A6/share');
    });
  });
});
