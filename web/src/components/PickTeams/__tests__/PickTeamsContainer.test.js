import { teamsAndPlayerCounts } from '../PickTeamsContainer';

const game = {
  gameId: 'A9',
  rankingPlayerUid: '',
  state: '',
  players: {
    map: {
      player1: {
        name: 'Player 1',
        teamUid: 'team1'
      },
      player2: {
        name: 'Player 2',
        teamUid: 'team1'
      },
      player3: {
        name: 'Player 3',
        teamUid: 'team2'
      },
      player4: {
        name: 'Player 4'
      }
    }
  },
  teams: {
    map: {
      team1: {
        name: 'Team 1'
      },
      team2: {
        name: 'Team 2'
      },
      team3: {
        name: 'Team 3'
      }
    },
    array: [{
      uid: 'team1',
      name: 'Team 1'
    }, {
      uid: 'team2',
      name: 'Team 2'
    }, {
      uid: 'team3',
      name: 'Team 3'
    }]
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

describe('the teamsAndPlayerCounts function', () => {
  it('should return an array of teams with the count of players on that team', () => {
    const teams = teamsAndPlayerCounts(game);

    expect(teams.length).toEqual(3);
    expect(teams[0].uid).toEqual('team1');
    expect(teams[0].playerCount).toEqual(2);
    expect(teams[1].uid).toEqual('team2');
    expect(teams[1].playerCount).toEqual(1);
    expect(teams[2].uid).toEqual('team3');
    expect(teams[2].playerCount).toEqual(0);
  });
});