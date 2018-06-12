import sinon from 'sinon';
import * as services from '../../services/LandingPage';

import {
  joinGame,
  gameIdChanged,
  startGame
} from '../LandingPage';
import {
  JOIN_GAME_ERROR,
  GAME_ID_CHANGED,
  STARTED_GAME,
  STARTING_GAME,
  START_GAME_ERROR
} from '../types';

it('should return an error when game ID is undefined', () => {
  const action = joinGame();
  expect(action.type).toEqual(JOIN_GAME_ERROR);
});

it('should return the new game ID', () => {
  const action = gameIdChanged('new id');
  expect(action.type).toEqual(GAME_ID_CHANGED);
  expect(action.payload).toEqual('new id');
});

describe('startGame', () => {
  let startGameService;
  let dispatch;

  beforeEach(() => {
    startGameService = sinon.stub();
    dispatch = sinon.fake();

    sinon.replace(services, 'startGameService', startGameService);
    startGame()(dispatch);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should dispatch a starting game action', () => {
    const dispatchedAction = dispatch.firstCall.args[0];

    expect(dispatchedAction.type).toEqual(STARTING_GAME);
  });

  it('should start a new game', () => {
    startGameService.callArgWith(0, 'B9');

    const dispatchedAction = dispatch.secondCall.args[0];

    expect(dispatchedAction.type).toEqual(STARTED_GAME);
    expect(dispatchedAction.payload).toEqual('B9');
  });

  it('should dispatch an error', () => {
    startGameService.callArg(1);

    const dispatchedAction = dispatch.secondCall.args[0];

    expect(dispatchedAction.type).toEqual(START_GAME_ERROR);
  });
});
