import Game, { INITIAL_STATE } from '../Game';
import {
  STARTED_GAME, NAME_CHANGED, NEW_GAME_DATA
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

const game = {
  gameId: 'A9',
  rankingPlayerUid: '',
  state: '',
  players: {
    player1: {
      name: 'Player 1'
    },
    player2: {
      name: 'Player 2'
    }
  },
  teams: {
    team1: {
      name: 'Team 1'
    }
  },
  topics: {
    topic1: {
      topic: 'Topic 1'
    },
    topic2: {
      topic: 'Topic 2'
    },
    topic3: {
      topic: 'Topic 3'
    }
  }
}

describe('the new game action', () => {
  it('preserves the existing state', () => {
    const action = {
      type: NEW_GAME_DATA,
      payload: game
    };

    const newState = Game({ andrew: 'sutherland' }, action);
    expect(newState.andrew).toEqual('sutherland');
  });

  it('creates a teams object', () => {
    const action = {
      type: NEW_GAME_DATA,
      payload: game
    };

    const newState = Game(undefined, action);
    expect(newState.teams.map.team1.name).toEqual('Team 1');
    expect(newState.teams.array.length).toEqual(1);
    expect(newState.teams.array[0].uid).toEqual('team1');
  });

  it('creates a topics object', () => {
    const action = {
      type: NEW_GAME_DATA,
      payload: game
    };

    const newState = Game(undefined, action);
    expect(newState.topics.map.topic2.topic).toEqual('Topic 2');
    expect(newState.topics.array.length).toEqual(3);
    expect(newState.topics.array[1].uid).toEqual('topic2');
  });
});
