import { getTeams } from '../HomescreenContainer';

const Game = {
  gameId: 'A9',
  gameUid: 'asdf',
  playerUid: 'player1',
  games: {
    asdf: {
      ranking: false
    }
  },
  players: {
    player1: {
      name: 'Player 1',
      teamUid: 'team1',
      score: 1
    },
    player2: {
      name: 'Player 2',
      teamUid: 'team1',
      score: 1
    },
    player3: {
      name: 'Player 3',
      teamUid: 'team2',
      score: 3
    },
    array: [
      {
        uid: 'player1',
        name: 'Player 1',
        teamUid: 'team1',
        score: 1
      },
      {
        uid: 'player2',
        name: 'Player 2',
        teamUid: 'team1',
        score: 1
      },
      {
        uid: 'player3',
        name: 'Player 3',
        teamUid: 'team2',
        score: 3
      }
    ]
  },
  teams: {
    team1: {
      name: 'Team 1'
    },
    team2: {
      name: 'Team 2'
    },
    team3: {
      name: 'Team 3'
    },
    array: [
      {
        uid: 'team1',
        name: 'Team 1'
      },
      {
        uid: 'team2',
        name: 'Team 2'
      },
      {
        uid: 'team3',
        name: 'Team 3'
      }
    ]
  },
  topics: {
    topic1: { status: 'available' },
    topic2: { status: 'available' },
    topic3: { status: 'available' },
    topic4: { status: 'available' },
    array: [
      { status: 'unavailable' },
      { status: 'unavailable' },
      { status: 'unavailable' },
      { status: 'unavailable' },
      { status: 'unavailable' },
      { status: 'unavailable' },
      { status: 'unavailable' },
      { status: 'unavailable' }
    ]
  }
};

describe('getTeams', () => {
  it('should return the correct number of teams', () => {
    expect(getTeams(Game).length).toEqual(2);
  });

  it('should return all players assigned to their relevant teams', () => {
    const teams = getTeams(Game);

    expect(teams[0].players.length).toEqual(2);
    expect(teams[0].players[0].uid).toEqual('player1');
    expect(teams[0].players[1].uid).toEqual('player2');
    expect(teams[1].players.length).toEqual(1);
    expect(teams[1].players[0].uid).toEqual('player3');
  });

  it('should calculate the team average score', () => {
    const teams = getTeams(Game);

    expect(teams[0].score).toEqual(1);
    expect(teams[1].score).toEqual(3);
  });
});
