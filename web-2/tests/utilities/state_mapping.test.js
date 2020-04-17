import {
  teamsToArray,
  topicsToArray,
  topicsToCount,
  topicsToPlayerTopics,
  playersToPlayersByTeam,
  toPlayer,
  toGameRound,
  toRankingPlayer,
  toUnlockedInPlayers
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

  describe('topicsToArray', () => {
    it('takes an object of topics by ID and returns an array', () => {
      const topicsById = {
        '12345': { topic: 'road trips', rank: 1 },
        '23456': { topic: 'sex on the beach', rank: 2 }
      };

      const topics = topicsToArray(topicsById);

      expect(topics).toEqual([
        { uid: '12345', topic: 'road trips', rank: 1 },
        { uid: '23456', topic: 'sex on the beach', rank: 2 }
      ]);
    });
  });

  describe('topicsToCount', () => {
    it('takes an object of topics by ID and returns the number of topics', () => {
      const topicsById = {
        '12345': { topic: 'road trips', rank: 1 },
        '23456': { topic: 'sex on the beach', rank: 2 }
      };

      const numTopics = topicsToCount(topicsById);

      expect(numTopics).toBe(2);
    });
  });

  describe('topicsToPlayerTopics', () => {
    it('takes state and returns the current players topics as an array', () => {
      const topicsById = {
        '12345': { topic: 'topic a', playerUid: 'abcde' },
        '23456': { topic: 'topic b', playerUid: 'bcdef' },
        '34567': { topic: 'topic c', playerUid: 'abcde' }
      };

      const playerTopics = topicsToPlayerTopics({
        playerUid: 'abcde',
        game: { topics: topicsById }
      });

      expect(playerTopics).toEqual([
        { uid: '12345', topic: 'topic a', playerUid: 'abcde' },
        { uid: '34567', topic: 'topic c', playerUid: 'abcde' }
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

  describe('toGameRound', () => {
    it('takes an object of topics by ID and returns the current game round', () => {
      const topicsById = {
        '12345': { status: 'unavailable' },
        '23456': { status: 'available' },
        '34567': { status: 'unavailable' },
        '23456': { status: 'unavailable' },
        '23456': { status: 'unavailable' }
      };

      expect(toGameRound(topicsById)).toBe(2);
    });
  });

  describe('toRankingPlayer', () => {
    it('takes game state and returns the ranking player object', () => {
      const game = {
        rankingPlayerUid: '23456',
        players: {
          '12345': { name: 'Andrew' },
          '23456': { name: 'Harrison' }
        }
      };

      expect(toRankingPlayer(game)).toEqual({ uid: '23456', name: 'Harrison' });
    });
  });

  describe('toUnlockedInPlayers', () => {
    it('takes an object of players by ID and returns all players who are not locked in', () => {
      const players = {
        '12345': { lockedIn: false },
        '23456': { lockedIn: true },
        '34567': { lockedIn: false }
      };

      expect(toUnlockedInPlayers(players)).toEqual([
        { uid: '12345', lockedIn: false },
        { uid: '34567', lockedIn: false }
      ]);
    });
  });
});
