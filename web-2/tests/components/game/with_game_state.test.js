import { GAME_STATE } from 'utilities/constants';

import { getGameState } from 'components/game/with_game_state';

function MockComponent() {
  return <div />;
}

describe('withGameState(WrappedComponent)', () => {
  describe('getGameState', () => {
    it('returns between rounds state', () => {
      expect(getGameState({ remoteGameState: null, player: {} }).state).toBe(
        GAME_STATE.BETWEEN_ROUNDS
      );
    });

    it('returns ranking state for the ranking player', () => {
      expect(
        getGameState({
          remoteGameState: 'ranking',
          rankingPlayerUid: '12345',
          player: { uid: '12345', lockedIn: false }
        })
      ).toEqual({ state: GAME_STATE.RANKING, ranking: true });
    });

    it('returns ranking state for the guessing player', () => {
      expect(
        getGameState({
          remoteGameState: 'ranking',
          rankingPlayerUid: '23456',
          player: { uid: '12345', lockedIn: false }
        })
      ).toEqual({ state: GAME_STATE.RANKING, ranking: false });
    });

    it('returns locked in state for the ranking player', () => {
      expect(
        getGameState({
          remoteGameState: 'ranking',
          rankingPlayerUid: '12345',
          player: { uid: '12345', lockedIn: true }
        })
      ).toEqual({ state: GAME_STATE.LOCKED_IN, ranking: true });
    });

    it('returns locked in state for the guessing player', () => {
      expect(
        getGameState({
          remoteGameState: 'ranking',
          rankingPlayerUid: '23456',
          player: { uid: '12345', lockedIn: true }
        })
      ).toEqual({ state: GAME_STATE.LOCKED_IN, ranking: false });
    });
  });
});
