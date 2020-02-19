import gameStateReducer from 'state/reducer';

describe('gameStateReducer', () => {
  it('returns state for unknown actions', () => {
    const state = gameStateReducer({ test: 'asdf' }, 'DUMMY_ACTION');

    expect(state).toEqual({ test: 'asdf' });
  });
});
