import { TOPIC_PACKS } from '@actions/types';
import { getTopicPacksService } from '@services';
import { tagLogger } from 'utilities/logging';

const getTopicPacks = async ({ state, dispatch }) => {
  if (state.topicPacks && state.topicPacks.length > 0) return;

  const topicPacks = await getTopicPacksService().catch(
    tagLogger('getTopicPacksService failed')
  );

  if (topicPacks) {
    dispatch({ type: TOPIC_PACKS, payload: topicPacks });
  }
};

export { getTopicPacks };
