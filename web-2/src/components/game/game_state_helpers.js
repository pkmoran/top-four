import { GAME_STATE } from 'utilities/constants';

const footerState = ({
  gameState: { state, ranker, unlockedInPlayers },
  startRound,
  lockIn
}) => {
  switch (state) {
    case GAME_STATE.BETWEEN_ROUNDS:
      return {
        _stateName: 'between_rounds',
        helperText: 'Whose turn is it to rank?',
        confirmText: `I'm up!`,
        confirmAction: startRound
      };
    case GAME_STATE.RANKING:
      return {
        _stateName: 'ranking',
        helperText: 'Feel good about your ranks?',
        confirmText: `Lock 'em in!`,
        confirmAction: lockIn
      };
    case GAME_STATE.LOCKED_IN:
      if (unlockedInPlayers.length === 0)
        return {
          _stateName: 'locked_in_all',
          helperText: `Everyone's locked in!`,
          confirmText: null,
          confirmAction: null
        };

      if (unlockedInPlayers.length === 1)
        return {
          _stateName: 'locked_in_single',
          helperText: `Waiting on ${unlockedInPlayers[0].name} to lock in!`,
          confirmText: null,
          confirmAction: null
        };

      return {
        _stateName: 'locked_in_multiple',
        helperText: `Waiting on ${unlockedInPlayers.length} players to lock in!`,
        confirmText: null,
        confirmAction: null
      };
  }
};

const bodyState = ({ gameState: { state, ranker }, rankingPlayer }) => {
  switch (state) {
    case GAME_STATE.BETWEEN_ROUNDS:
      return {
        header: 'Waiting!',
        subheader: '...for someone to start ranking.'
      };
    case GAME_STATE.RANKING:
    case GAME_STATE.LOCKED_IN:
      if (ranker)
        return {
          header: 'Rank!',
          subheader: '...the following topics, best to worst.'
        };

      return {
        header: 'Guess!',
        subheader: `...how ${rankingPlayer.name} would rank the following topics.`
      };
  }
};

export { footerState, bodyState };
