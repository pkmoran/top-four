import { TOPIC_PACKS, STARTED_GAME } from 'actions/types';
import { WRITE_OUR_OWN_UID } from 'utilities/constants';
import { withReducerLogging } from 'utilities/logging';

const gameStateReducer = (state, { type, payload }) => {
  switch (type) {
    case STARTED_GAME:
      const { gameId, gameUid, playerUid, name } = payload;

      return { ...state, gameId, gameUid, playerUid, name };
    case TOPIC_PACKS:
      const topicPacks = Object.keys(payload).map(uid => {
        const { name, topics } = payload[uid];

        return {
          rawName: name,
          name: `${name} (${Object.keys(topics).length})`,
          uid
        };
      });

      topicPacks.unshift({
        rawName: 'Write our own!',
        name: 'Write our own!',
        uid: WRITE_OUR_OWN_UID
      });

      return {
        ...state,
        topicPacks
      };
    default:
      return state;
  }
};

export default withReducerLogging(gameStateReducer);
