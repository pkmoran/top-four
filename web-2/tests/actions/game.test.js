import { route } from 'preact-router';
import {
  getTopicPacksService,
  addPlayerService,
  startGameService,
  getGameService
} from 'services/game';

jest.mock('preact-router', () => ({
  route: jest.fn()
}));

jest.mock('services/game', () => ({
  getTopicPacksService: jest.fn(),
  addPlayerService: jest.fn(),
  startGameService: jest.fn(),
  getGameService: jest.fn()
}));

import { startGame, getTopicPacks, addPlayer, joinGame } from 'actions/game';
import { TOPIC_PACKS, STARTED_GAME } from 'actions/types';
import { TEAMS, INDIVIDUALS, WRITE_OUR_OWN_UID } from 'utilities/constants';

describe('game actions', () => {
  beforeEach(() => {
    route.mockClear();
    getTopicPacksService.mockClear();
    addPlayerService.mockClear();
    startGameService.mockClear();
    getGameService.mockClear();
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
      startGameService.mockRejectedValue();

      startGame(
        { name: 'andrew', gameMode: TEAMS, topicPackUid: '12345' },
        {}
      ).catch(jest.fn);

      expect(startGameService).toHaveBeenCalledTimes(1);
      expect(startGameService.mock.calls[0][0]).toEqual({
        numberOfTeams: 2,
        topicPackUid: '12345'
      });
    });

    it('calls startGameService for individuals and no topic pack', () => {
      startGameService.mockRejectedValue();

      startGame(
        {
          name: 'andrew',
          gameMode: INDIVIDUALS,
          topicPackUid: WRITE_OUR_OWN_UID
        },
        {}
      ).catch(jest.fn);

      expect(startGameService).toHaveBeenCalledTimes(1);
      expect(startGameService.mock.calls[0][0]).toEqual({
        numberOfTeams: 1,
        topicPackUid: null
      });
    });

    it('starts a game', async () => {
      startGameService.mockResolvedValue({ gameId: 'A6', gameUid: '12345' });
      addPlayerService.mockResolvedValue('98765');
      const dispatch = jest.fn();

      await startGame({ name: 'andrew' }, { dispatch });

      expect(startGameService).toHaveBeenCalledTimes(1);

      expect(addPlayerService).toHaveBeenCalledTimes(1);
      expect(addPlayerService.mock.calls[0][0]).toEqual({
        gameUid: '12345',
        name: 'andrew'
      });

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

    it('rejects if startGameService fails', () => {
      startGameService.mockRejectedValue();

      expect(startGame({}, {})).rejects.toBe('cannot start game');
    });

    it('rejects if startGameService does not return a game object', () => {
      startGameService.mockResolvedValue('not a game object');

      expect(startGame({}, {})).rejects.toBe('cannot start game');
    });

    it('rejects if addPlayerService fails', () => {
      startGameService.mockResolvedValue({ gameId: 'A6', gameUid: '12345' });
      addPlayerService.mockRejectedValue();

      expect(startGame({}, {})).rejects.toBe('cannot add player');
    });
  });

  describe('joinGame', () => {
    it('joins a game', async () => {
      getGameService.mockResolvedValue({ gameUid: '12345' });
      addPlayerService.mockResolvedValue('98765');
      const dispatch = jest.fn();

      await joinGame({ gameId: 'A6', name: 'andrew' }, { dispatch });

      expect(getGameService).toHaveBeenCalledTimes(1);
      expect(getGameService.mock.calls[0][0]).toBe('A6');

      expect(addPlayerService).toHaveBeenCalledTimes(1);
      expect(addPlayerService.mock.calls[0][0]).toEqual({
        gameUid: '12345',
        name: 'andrew'
      });

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

    it('rejects if getGameService fails', () => {
      getGameService.mockRejectedValue();

      expect(joinGame({}, {})).rejects.toBe('cannot get game object');
    });

    it('rejects if getGameService does not return a game object', () => {
      getGameService.mockResolvedValue('not a game object');

      expect(joinGame({}, {})).rejects.toBe('cannot get game object');
    });

    it('rejects if addPlayerService fails', () => {
      getGameService.mockResolvedValue({ gameUid: '12345 ' });
      addPlayerService.mockRejectedValue();

      expect(joinGame({}, {})).rejects.toBe('cannot add player');
    });
  });
});
