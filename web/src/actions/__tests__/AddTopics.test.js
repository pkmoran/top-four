import sinon from 'sinon';

import { done } from '../AddTopics';

describe('the done action', () => {
  it('should navigate to the homescreen', () => {
    const push = sinon.fake();
    const history = { push };
    const getState = sinon.fake.returns({
      Game: {
        gameId: 'A9'
      }
    });

    done(history)(null, getState);
    expect(history.push.calledWith('/A9/homescreen')).toEqual(true);
  });
});
