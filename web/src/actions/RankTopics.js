import _ from 'lodash';
import { UPDATE_MY_RANKS } from './types';

export const updateMyRanks = (topics, sourceIndex, destinationIndex) => {
  const reorderedTopics = Array.from(topics);
  const [removed] = reorderedTopics.splice(sourceIndex, 1);
  reorderedTopics.splice(destinationIndex, 0, removed);

  const localRanks = _.reduce(
    reorderedTopics,
    (result, value, index) => ({
      ...result,
      [value.uid]: index
    }),
    {}
  );

  return {
    type: UPDATE_MY_RANKS,
    payload: localRanks
  };
};
