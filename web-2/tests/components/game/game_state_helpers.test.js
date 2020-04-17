import footerState from 'components/game/game_state_helpers';

describe('game state helpers', () => {
  describe('footerState', () => {
    it('returns between rounds state', () => {
      expect(footerState({ gameState: undefined })._stateName).toBe(
        'between_rounds'
      );
      expect(footerState({ gameState: '' })._stateName).toBe('between_rounds');
    });

    it('returns ranking state', () => {
      expect(
        footerState({ gameState: 'ranking', player: { lockedIn: false } })
          ._stateName
      ).toBe('ranking');
    });

    it('returns all players locked in state', () => {
      expect(
        footerState({
          gameState: 'ranking',
          player: { lockedIn: true },
          unlockedInPlayers: []
        })._stateName
      ).toBe('locked_in_all');
    });

    it('returns one player not locked in state', () => {
      const state = footerState({
        gameState: 'ranking',
        player: { lockedIn: true },
        unlockedInPlayers: [{ name: 'Emily' }]
      });

      expect(state._stateName).toBe('locked_in_single');
      expect(state.helperText).toEqual(expect.stringContaining('Emily'));
    });

    it('returns multiple not locked in state', () => {
      const state = footerState({
        gameState: 'ranking',
        player: { lockedIn: true },
        unlockedInPlayers: [{}, {}]
      });

      expect(state._stateName).toBe('locked_in_multiple');
      expect(state.helperText).toEqual(expect.stringContaining('2'));
    });
  });
});
