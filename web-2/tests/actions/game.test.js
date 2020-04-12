import { route } from 'preact-router';
import {
  getTopicPacksService,
  addPlayerService,
  startGameService,
  getGameUidService,
  subscribeToGameUpdatesService,
  addTopicService
} from 'services/game';

jest.mock('preact-router', () => ({
  route: jest.fn()
}));

jest.mock('services/game', () => ({
  getTopicPacksService: jest.fn(),
  addPlayerService: jest.fn(),
  startGameService: jest.fn(),
  getGameUidService: jest.fn(),
  subscribeToGameUpdatesService: jest.fn(),
  addTopicService: jest.fn()
}));

import {
  startGame,
  getTopicPacks,
  addPlayer,
  joinGame,
  subscribeToGameUpdates,
  addTopic
} from 'actions/game';

import { TOPIC_PACKS, STARTED_GAME, GAME_UPDATE } from 'actions/types';
import { TEAMS, INDIVIDUALS, WRITE_OUR_OWN_UID } from 'utilities/constants';

describe('game actions', () => {
  beforeEach(() => {
    route.mockClear();
    getTopicPacksService.mockClear();
    addPlayerService.mockClear();
    startGameService.mockClear();
    getGameUidService.mockClear();
    subscribeToGameUpdatesService.mockClear();
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
        numberOfTeams: 0,
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

      expect(subscribeToGameUpdatesService).toHaveBeenCalledTimes(1);
      expect(subscribeToGameUpdatesService.mock.calls[0][0]).toBe('12345');

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
      getGameUidService.mockResolvedValue({ gameUid: '12345' });
      addPlayerService.mockResolvedValue('98765');
      const dispatch = jest.fn();

      await joinGame({ gameId: 'A6', name: 'andrew' }, { dispatch });

      expect(getGameUidService).toHaveBeenCalledTimes(1);
      expect(getGameUidService.mock.calls[0][0]).toBe('A6');

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

      expect(subscribeToGameUpdatesService).toHaveBeenCalledTimes(1);
      expect(subscribeToGameUpdatesService.mock.calls[0][0]).toBe('12345');

      expect(route).toHaveBeenCalledTimes(1);
      expect(route.mock.calls[0][0]).toBe('A6/teams');
    });

    it('rejects if getGameUidService fails', () => {
      getGameUidService.mockRejectedValue();

      expect(joinGame({}, {})).rejects.toBe('cannot get game object');
    });

    it('rejects if getGameUidService does not return a game object', () => {
      getGameUidService.mockResolvedValue('not a game object');

      expect(joinGame({}, {})).rejects.toBe('cannot get game object');
    });

    it('rejects if addPlayerService fails', () => {
      getGameUidService.mockResolvedValue({ gameUid: '12345 ' });
      addPlayerService.mockRejectedValue();

      expect(joinGame({}, {})).rejects.toBe('cannot add player');
    });
  });

  describe('subscribeToGameUpdates', () => {
    it('calls subscribeToGameUpdatesService with gameUid', () => {
      subscribeToGameUpdates('12345', {});

      expect(subscribeToGameUpdatesService).toHaveBeenCalledTimes(1);
      expect(subscribeToGameUpdatesService.mock.calls[0][0]).toBe('12345');
    });

    it('dispatches the game update action on new data', () => {
      const dispatch = jest.fn();

      subscribeToGameUpdates('12345', { dispatch });

      const on = subscribeToGameUpdatesService.mock.calls[0][1];
      on({ newData: '98765' });

      expect(dispatch).toHaveBeenCalledTimes(1);

      const dispatchedAction = dispatch.mock.calls[0][0];

      expect(dispatchedAction.type).toBe(GAME_UPDATE);
      expect(dispatchedAction.payload).toEqual({ newData: '98765' });
    });
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
});
