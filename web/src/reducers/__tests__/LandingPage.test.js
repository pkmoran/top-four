import LandingPage, { INITIAL_STATE } from '../LandingPage';
import {
  JOIN_GAME_ERROR,
  GAME_ID_CHANGED,
  STARTING_GAME,
  STARTED_GAME
} from '../../actions/types';

describe('default behavior', () => {
  it('defaults state appropriately', () => {
    const newState = LandingPage(undefined, {});
    expect(newState).toEqual(INITIAL_STATE);
  });

  it('ignores unknown action types', () => {
    const unknownAction = {
      type: 'unknown',
      payload: 'asdf'
    };

    const newState = LandingPage({ test: 3 }, unknownAction);
    expect(newState).toEqual({ test: 3 });
  });
});

it('sets an error message', () => {
  const action = {
    type: JOIN_GAME_ERROR,
    payload: 'test error'
  };

  const newState = LandingPage(undefined, action);
  expect(newState.error).toEqual('test error');
});

it('saves the game id', () => {
  const action = {
    type: GAME_ID_CHANGED,
    payload: 'new id'
  };

  const newState = LandingPage(undefined, action);
  expect(newState.gameId).toEqual('new id');
});

it('sets loading when starting a game', () => {
  const action = {
    type: STARTING_GAME
  };

  const newState = LandingPage(undefined, action);
  expect(newState.loading).toEqual(true);
});

it('resets state when a new game is started', () => {
  const action = {
    type: STARTED_GAME
  };

  const newState = LandingPage({
    error: 'fake',
    gameId: 'asdf',
    loading: true
  }, action);
  expect(newState).toEqual(INITIAL_STATE);
});
