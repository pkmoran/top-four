import { startGame, getTopicPacks } from 'actions/game';
import { TOPIC_PACKS } from 'actions/types';

describe('game actions', () => {
  describe('getTopicPacks', () => {
    it('calls getTopicPacksService', () => {
      const getTopicPacksService = jest.fn().mockResolvedValue([42]);

      getTopicPacks({ state: {}, dispatch: () => {} }, getTopicPacksService);

      expect(getTopicPacksService).toHaveBeenCalledTimes(1);
    });

    it('dispatches the topic packs action on success', async () => {
      const getTopicPacksService = jest.fn().mockResolvedValue([42]);
      const dispatch = jest.fn();

      await getTopicPacks({ state: {}, dispatch }, getTopicPacksService);

      expect(dispatch).toHaveBeenCalledTimes(1);

      const dispatchedAction = dispatch.mock.calls[0][0];

      expect(dispatchedAction.type).toBe(TOPIC_PACKS);
      expect(dispatchedAction.payload).toEqual([42]);
    });

    it('does not call getTopicPacksService if topic packs already exist', () => {
      const getTopicPacksService = jest.fn().mockResolvedValue(42);

      getTopicPacks({ state: { topicPacks: [42] } }, getTopicPacksService);

      expect(getTopicPacksService).not.toHaveBeenCalled();
    });
  });
});
