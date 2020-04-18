import { GAME_STATE } from 'utilities/constants';

import footerState from 'components/game/game_state_helpers';

describe('game state helpers', () => {
  describe('footerState', () => {
    it('returns between rounds state', () => {
      expect(
        footerState({ gameState: { state: GAME_STATE.BETWEEN_ROUNDS } })
          ._stateName
      ).toBe('between_rounds');
    });

    it('returns ranking state', () => {
      expect(
        footerState({ gameState: { state: GAME_STATE.RANKING } })._stateName
      ).toBe('ranking');
    });

    it('returns all players locked in state', () => {
      expect(
        footerState({
          gameState: { state: GAME_STATE.LOCKED_IN },
          unlockedInPlayers: []
        })._stateName
      ).toBe('locked_in_all');
    });

    it('returns one player not locked in state', () => {
      const state = footerState({
        gameState: { state: GAME_STATE.LOCKED_IN },
        unlockedInPlayers: [{ name: 'Emily' }]
      });

      expect(state._stateName).toBe('locked_in_single');
      expect(state.helperText).toEqual(expect.stringContaining('Emily'));
    });

    it('returns multiple not locked in state', () => {
      const state = footerState({
        gameState: { state: GAME_STATE.LOCKED_IN },
        unlockedInPlayers: [{}, {}]
      });

      expect(state._stateName).toBe('locked_in_multiple');
      expect(state.helperText).toEqual(expect.stringContaining('2'));
    });
  });
});
