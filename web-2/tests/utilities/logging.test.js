import { withReducerLogging, tagLogger } from 'utilities/logging';

describe('logging', () => {
  describe('withReducerLogging', () => {
    const reducer = (state, action) => {
      return { ...state, [action.type]: action.payload };
    };
    const state = { test: 'asdf' };
    const action = { type: 'new', payload: 42 };

    it('behaves exactly like a reducer', () => {
      const loggingReducer = withReducerLogging(reducer);

      const newState = loggingReducer(state, action);

      expect(newState).toEqual({ test: 'asdf', new: 42 });
    });

    it('logs messages', () => {
      const log = jest.fn();
      const loggingReducer = withReducerLogging(reducer, log);

      loggingReducer(state, action);

      expect(log).toHaveBeenCalledTimes(4);

      const [firstCall, secondCall, thirdCall, fourthCall] = log.mock.calls;

      expect(firstCall[0]).toBe('##### reducer #####');
      expect(secondCall[0]).toBe('old state: ');
      expect(secondCall[1]).toEqual({ test: 'asdf' });
      expect(thirdCall[0]).toBe('action:    ');
      expect(thirdCall[1]).toEqual({ type: 'new', payload: 42 });
      expect(fourthCall[0]).toBe('new state: ');
      expect(fourthCall[1]).toEqual({ test: 'asdf', new: 42 });
    });
  });

  describe('tagLogger', () => {
    it('returns a function', () => {
      expect(tagLogger('testTag') instanceof Function).toBeTruthy();
    });

    it('logs an error', () => {
      const log = jest.fn();

      const logger = tagLogger('testTag', log);
      logger('error message 12345');
      expect(log.mock.calls[0][0]).toBe('testTag: error message 12345');
    });
  });
});
