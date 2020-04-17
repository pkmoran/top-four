const footerState = ({
  gameState,
  player,
  unlockedInPlayers,
  startRound,
  lockIn,
  rankingPlayerUid
}) => {
  if (!gameState) return betweenRounds(startRound);

  if (gameState === 'ranking' && !player.lockedIn) return ranking(lockIn);

  if (gameState === 'ranking' && player.lockedIn)
    return lockedIn(unlockedInPlayers);
};

const betweenRounds = startRound => ({
  _stateName: 'between_rounds',
  helperText: 'Whose turn is it to rank?',
  confirmText: `I'm up!`,
  confirmAction: startRound
});

const ranking = lockIn => ({
  _stateName: 'ranking',
  helperText: 'Feel good about your ranks?',
  confirmText: `Lock 'em in!`,
  confirmAction: lockIn
});

const lockedIn = unlockedInPlayers => {
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
};

export default footerState;
