import Game, { INITIAL_STATE } from '../Game';
import {
  STARTED_GAME, NAME_CHANGED
} from '../../actions/types';

describe('default behavior', () => {
  it('defaults state appropriately', () => {
    const newState = Game(undefined, {});
    expect(newState).toEqual(INITIAL_STATE);
  });

  it('ignores unknown action types', () => {
    const unknownAction = {
      type: 'unknown',
      payload: 'asdf'
    };

    const newState = Game({ test: 3 }, unknownAction);
    expect(newState).toEqual({ test: 3 });
  });
});

it('sets the game ID and UID', () => {
  const action = {
    type: STARTED_GAME,
    payload: {
      gameId: 'A9',
      gameUid: 'asdf'
    }
  };

  const newState = Game(undefined, action);
  expect(newState.gameId).toEqual('A9');
  expect(newState.gameUid).toEqual('asdf');
});

it('sets the name', () => {
  const action = {
    type: NAME_CHANGED,
    payload: 'asdf'
  };

  const newState = Game(undefined, action);
  expect(newState.name).toEqual('asdf');
});
