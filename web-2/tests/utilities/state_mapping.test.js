import {
  teamsToArray,
  playersToPlayersByTeam,
  toPlayer
} from 'utilities/state_mapping';

describe('state mapping functions', () => {
  describe('teamsToArray', () => {
    it('takes an object of teams by ID and returns an array', () => {
      const teamsById = {
        '12345': { name: 'Team 1' },
        '23456': { name: 'Team 2' }
      };

      const teams = teamsToArray(teamsById);

      expect(teams).toEqual([
        { uid: '12345', name: 'Team 1' },
        { uid: '23456', name: 'Team 2' }
      ]);
    });
  });

  describe('playersToPlayersByTeam', () => {
    it('takes an object of players by ID and returns an object of teams by ID with players', () => {
      const players = {
        '12345': { name: 'Andrew', teamUid: 'abcde' },
        '23456': { name: 'Emily', teamUid: 'bcdef' },
        '34567': { name: 'Harrison', teamUid: 'cdefg' },
        '45678': { name: 'Lauren', teamUid: 'bcdef' }
      };

      const playersByTeam = playersToPlayersByTeam(players);

      expect(playersByTeam).toEqual({
        abcde: [{ uid: '12345', name: 'Andrew', teamUid: 'abcde' }],
        bcdef: [
          { uid: '23456', name: 'Emily', teamUid: 'bcdef' },
          { uid: '45678', name: 'Lauren', teamUid: 'bcdef' }
        ],
        cdefg: [{ uid: '34567', name: 'Harrison', teamUid: 'cdefg' }]
      });
    });
  });

  describe('toPlayer', () => {
    it('takes state and returns the current player object', () => {
      const state = {
        playerUid: '12345',
        game: {
          players: { '23456': { name: 'Andrew' }, '12345': { name: 'Emily' } }
        }
      };

      const player = toPlayer(state);

      expect(player).toEqual({ uid: '12345', name: 'Emily' });
    });
  });
});
