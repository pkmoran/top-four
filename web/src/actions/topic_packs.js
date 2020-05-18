import { TOPIC_PACKS } from '@actions/types';
import { getTopicPacksService } from '@services';
import { tagLogger } from 'utilities/logging';
import { WRITE_OUR_OWN_UID } from 'utilities/constants';

const getTopicPacks = async ({ state, dispatch }) => {
  if (state.topicPacks && state.topicPacks.length > 0) return;

  const topicPacks = await getTopicPacksService().catch(
    tagLogger('getTopicPacksService failed')
  );

  if (topicPacks) {
    const packs = Object.keys(topicPacks)
      .map(uid => {
        const topicPack = topicPacks[uid];
        const { name, topics } = topicPack;

        const numTopics = Object.keys(topics).length;
        const numTurns = Math.floor(numTopics / 4);

        return {
          uid,
          ...topicPack,
          rawName: name,
          name: `${name} (${numTurns} turns)`
        };
      })
      .sort(({ isRandomPack }) => (isRandomPack ? -1 : 1));

    packs.unshift({
      uid: WRITE_OUR_OWN_UID,
      isRandomPack: false,
      rawName: 'Write our own!',
      name: 'Write our own!'
    });

    dispatch({ type: TOPIC_PACKS, payload: packs });
  }
};

export { getTopicPacks };
