import { GAME_STATE } from 'utilities/constants';

import { getGameState } from 'components/game/with_game_state';

function MockComponent() {
  return <div />;
}

describe('withGameState(WrappedComponent)', () => {
  describe('getGameState', () => {
    it('returns between rounds state', () => {
      expect(
        getGameState({
          remoteGameState: null,
          player: {},
          players: [{ uid: '12345' }]
        }).state
      ).toBe(GAME_STATE.BETWEEN_ROUNDS);
    });

    describe('next ranker', () => {
      it('defaults to the first player when there is no previous ranker', () => {
        const players = [{ uid: '12345' }, { uid: '23456' }, { uid: '34567' }];

        expect(
          getGameState({ remoteGameState: null, player: {}, players })
            .nextRanker.uid
        ).toBe('12345');
      });

      it('calculates the next ranker in between rounds', () => {
        const players = [{ uid: '12345' }, { uid: '23456' }, { uid: '34567' }];

        expect(
          getGameState({
            remoteGameState: null,
            player: {},
            rankingPlayerUid: '12345',
            players
          }).nextRanker.uid
        ).toBe('23456');
      });

      it('wraps the next ranker in between rounds', () => {
        const players = [{ uid: '12345' }, { uid: '23456' }, { uid: '34567' }];

        expect(
          getGameState({
            remoteGameState: null,
            player: {},
            rankingPlayerUid: '34567',
            players
          }).nextRanker.uid
        ).toBe('12345');
      });

      it('is the current player', () => {
        const players = [{ uid: '12345' }, { uid: '23456' }, { uid: '34567' }];

        expect(
          getGameState({
            remoteGameState: null,
            player: { uid: '34567' },
            rankingPlayerUid: '23456',
            players
          }).nextRanker.isThisPlayer
        ).toBe(true);
      });

      it('is not the current player', () => {
        const players = [{ uid: '12345' }, { uid: '23456' }, { uid: '34567' }];

        expect(
          getGameState({
            remoteGameState: null,
            player: { uid: '12345' },
            rankingPlayerUid: '23456',
            players
          }).nextRanker.isThisPlayer
        ).toBe(false);
      });
    });

    it('returns ranking state for the ranking player', () => {
      expect(
        getGameState({
          remoteGameState: 'ranking',
          rankingPlayerUid: '12345',
          player: { uid: '12345', lockedIn: false },
          players: [{ uid: '12345' }]
        })
      ).toEqual({ state: GAME_STATE.RANKING, ranker: true });
    });

    it('returns ranking state for the guessing player', () => {
      expect(
        getGameState({
          remoteGameState: 'ranking',
          rankingPlayerUid: '23456',
          player: { uid: '12345', lockedIn: false },
          players: [{ uid: '23456' }]
        })
      ).toEqual({ state: GAME_STATE.RANKING, ranker: false });
    });

    it('returns locked in state for the ranking player', () => {
      expect(
        getGameState({
          remoteGameState: 'ranking',
          rankingPlayerUid: '12345',
          player: { uid: '12345', lockedIn: true },
          players: [{ uid: '12345' }]
        })
      ).toEqual({ state: GAME_STATE.LOCKED_IN, ranker: true });
    });

    it('returns locked in state for the guessing player', () => {
      expect(
        getGameState({
          remoteGameState: 'ranking',
          rankingPlayerUid: '23456',
          player: { uid: '12345', lockedIn: true },
          players: [{ uid: '23456' }]
        })
      ).toEqual({ state: GAME_STATE.LOCKED_IN, ranker: false });
    });
  });
});
