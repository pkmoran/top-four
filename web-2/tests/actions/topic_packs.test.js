import { getTopicPacksService } from '@services';

jest.mock('@services', () => ({
  getTopicPacksService: jest.fn()
}));

import { getTopicPacks } from '@actions';

import { TOPIC_PACKS } from '@actions/types';

describe('topic pack actions', () => {
  beforeEach(() => {
    getTopicPacksService.mockClear();
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
});
