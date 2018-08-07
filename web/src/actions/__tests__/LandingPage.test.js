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
  const dispatch = sinon.fake();
  joinGame()(dispatch);
  const dispatchedAction = dispatch.firstCall.args[0];
  expect(dispatchedAction.type).toEqual(JOIN_GAME_ERROR);
});

it('should return the new game ID', () => {
  const action = gameIdChanged('new id');
  expect(action.type).toEqual(GAME_ID_CHANGED);
  expect(action.payload).toEqual('new id');
});

describe('startGame', () => {
  let startGameService;
  let addPlayer;
  let dispatch;
  let getState;

  beforeEach(() => {
    startGameService = sinon.stub();
    addPlayer = sinon.stub();
    dispatch = sinon.fake();
    getState = sinon.stub();

    getState.returns({ Game: { name: 'andrew' } });

    sinon.replace(services, 'startGameService', startGameService);
    sinon.replace(services, 'addPlayerService', addPlayer);
    startGame()(dispatch, getState);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should dispatch a starting game action', () => {
    const dispatchedAction = dispatch.firstCall.args[0];

    expect(dispatchedAction.type).toEqual(STARTING_GAME);
  });

  it('should start a new game', () => {
    startGameService.callArgWith(0, { gameId: 'B9', gameUid: 'asdf' });

    const dispatchedAction = dispatch.secondCall.args[0];

    expect(dispatchedAction.type).toEqual(STARTED_GAME);
    expect(dispatchedAction.payload.gameId).toEqual('B9');
    expect(dispatchedAction.payload.gameUid).toEqual('asdf');
  });

  it('should dispatch an error', () => {
    startGameService.callArg(1);

    const dispatchedAction = dispatch.secondCall.args[0];

    expect(dispatchedAction.type).toEqual(START_GAME_ERROR);
  });

  it('should call addPlayer', () => {
    startGameService.callArgWith(0, { gameId: 'B9', gameUid: 'asdf' });

    const gameUid = addPlayer.firstCall.args[0];
    const name = addPlayer.firstCall.args[1];

    expect(gameUid).toEqual('asdf');
    expect(name).toEqual('andrew');
  });
});
