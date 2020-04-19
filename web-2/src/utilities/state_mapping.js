const teamsToArray = teams =>
  Object.keys(teams).map(uid => ({ uid, ...teams[uid] }));

const topicsToArray = topics =>
  Object.keys(topics).map(uid => ({ uid, ...topics[uid] }));

const playersToArray = players =>
  Object.keys(players).map(uid => ({ uid, ...players[uid] }));

const topicsToCount = topics => Object.keys(topics).length;

const topicsToPlayerTopics = ({ playerUid, game: { topics = {} } }) =>
  topicsToArray(topics).filter(topic => topic.playerUid === playerUid);

const playersToPlayersByTeam = players =>
  playersToArray(players).reduce((playersByTeam, player) => {
    const { teamUid } = player;

    const team = playersByTeam[teamUid] || [];

    return {
      ...playersByTeam,
      [teamUid]: [...team, player]
    };
  }, {});

const toPlayer = ({ playerUid, game: { players } }) => ({
  ...players[playerUid],
  uid: playerUid
});

const toGameRound = topics =>
  1 +
  Math.ceil(
    topicsToArray(topics).filter(({ status }) => status === 'unavailable')
      .length / 4
  );

const toRemainingRounds = topics =>
  Math.floor(
    topicsToArray(topics).filter(({ status }) => status === 'available')
      .length / 4
  );

const toRankingPlayer = ({ rankingPlayerUid, players }) => ({
  uid: rankingPlayerUid,
  ...players[rankingPlayerUid]
});

const toActiveTopics = topics =>
  topicsToArray(topics).filter(
    ({ status }) => status === 'active' || status === 'ranked'
  );

const toUnlockedInPlayers = players =>
  playersToArray(players).filter(({ lockedIn }) => !lockedIn);

const toGuessesByTopic = guesses =>
  Object.keys(guesses)
    .map(playerUid => ({ ...guesses[playerUid] }))
    .reduce((topicGuesses, playerGuesses) => {
      Object.keys(playerGuesses).forEach(topicUid => {
        const playerGuess = playerGuesses[topicUid];

        if (playerGuess === 'active') return;

        topicGuesses[topicUid] = [
          ...(topicGuesses[topicUid] || []),
          playerGuess
        ];
      });

      return topicGuesses;
    }, {});

export {
  teamsToArray,
  topicsToArray,
  topicsToCount,
  topicsToPlayerTopics,
  playersToPlayersByTeam,
  toPlayer,
  toGameRound,
  toRankingPlayer,
  toActiveTopics,
  toUnlockedInPlayers,
  toGuessesByTopic,
  toRemainingRounds
};
