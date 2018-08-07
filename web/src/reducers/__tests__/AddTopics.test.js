import AddTopics, { INITIAL_STATE } from '../AddTopics';
import {
  ADD_TOPIC
} from '../../actions/types';

describe('default behavior', () => {
  it('defaults state appropriately', () => {
    const newState = AddTopics(undefined, {});
    expect(newState).toEqual(INITIAL_STATE);
  });

  it('ignores unknown action types', () => {
    const unknownAction = {
      type: 'unknown',
      payload: 'asdf'
    };

    const newState = AddTopics({ test: 3 }, unknownAction);
    expect(newState).toEqual({ test: 3 });
  });
});
