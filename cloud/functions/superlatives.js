const data = require('./mock_game_data').data;

exports.generate = gameData => {
  const superlatives = [];

  theWinningTeam(superlatives, gameData);
  theExpert(superlatives, gameData);
  theIndividualTopicAwards(superlatives, gameData);
  theDisagreeTeam(superlatives, gameData);

  return superlatives;
};

const theWinningTeam = (superlatives, data) => {
  const teamScores = Object.keys(data.players).reduce((teams, playerUid) => {
    const player = data.players[playerUid];

    if (!player.teamUid) {
      return teams;
    }

    return {
      ...teams,
      [player.teamUid]: (teams[player.teamUid] || 0) + player.score
    };
  }, {});

  const winningTeamUid = Object.keys(teamScores).reduce((winningUid, teamUid) =>
    teamScores[winningUid] > teamScores[teamUid] ? winningUid : teamUid
  );

  superlatives.push({
    title: 'The Winner',
    receivedBy: data.teams[winningTeamUid].name,
    description: 'Winner, winner, chicken dinner'
  });
};

const theExpert = (superlatives, data) => {
  const expertUid = Object.keys(data.players).reduce((winningUid, playerUid) =>
    data.players[winningUid].score > data.players[playerUid].score
      ? winningUid
      : playerUid
  );

  superlatives.push({
    title: 'The Expert',
    receivedBy: data.players[expertUid].name,
    description: `Congrats! You know the most about how people feel about random, trivial things. Oh, the places you'll go.`
  });
};

const theIndividualTopicAwards = (superlatives, data) => {
  const topicGuesses = Object.keys(data.guesses).reduce(
    (topicGuesses, playerUid) => {
      Object.keys(data.guesses[playerUid]).forEach(topicUid => {
        if (!topicGuesses[topicUid]) {
          topicGuesses[topicUid] = {
            correctRank: data.topics[topicUid].rank,
            guesses: [],
            ranker: undefined,
            numberCorrect: 0,
            numberIncorrect: 0
          };
        }

        if (data.guesses[playerUid][topicUid] === 'active') {
          topicGuesses[topicUid].ranker = playerUid;
        } else {
          const guess = data.guesses[playerUid][topicUid];

          topicGuesses[topicUid].guesses.push(guess);

          if (guess === topicGuesses[topicUid].correctRank) {
            topicGuesses[topicUid].numberCorrect += 1;
          } else {
            topicGuesses[topicUid].numberIncorrect += 1;
          }
        }
      });

      return topicGuesses;
    },
    {}
  );

  const rankers = Object.keys(topicGuesses).reduce((rankers, topicUid) => {
    const topicGuess = topicGuesses[topicUid];
    const rankerUid = topicGuess.ranker;

    if (!rankers[rankerUid]) {
      rankers[rankerUid] = {
        numberCorrect: 0,
        numberLied: 0,
        numberPerfect: 0
      };
    }

    rankers[rankerUid].numberCorrect += topicGuess.numberCorrect;

    if (
      topicGuess.numberCorrect === 0 &&
      new Set(topicGuess.guesses).size === 1
    ) {
      rankers[rankerUid].numberLied += 1;
    }

    if (topicGuess.numberIncorrect === 0) {
      rankers[rankerUid].numberPerfect += 1;
    }

    return rankers;
  }, {});

  const lowestRankerUid = Object.keys(rankers).reduce((lowestUid, rankerUid) =>
    rankers[lowestUid].numberCorrect < rankers[rankerUid].numberCorrect
      ? lowestUid
      : rankerUid
  );

  const mostLiedUid = Object.keys(rankers).reduce((mostUid, rankerUid) =>
    rankers[mostUid].numberLied > rankers[rankerUid].numberLied
      ? mostUid
      : rankerUid
  );

  const mostPerfectUid = Object.keys(rankers).reduce((mostUid, rankerUid) =>
    rankers[mostUid].numberPerfect > rankers[rankerUid].numberPerfect
      ? mostUid
      : rankerUid
  );

  superlatives.push({
    title: 'The Complete Stranger',
    receivedBy: data.players[lowestRankerUid].name,
    description: `Do you know anyone here? Because they don't know you. They only guessed ${
      rankers[lowestRankerUid].numberCorrect
    } of your ranks correctly.`
  });

  superlatives.push({
    title: 'The Liar',
    receivedBy: data.players[mostLiedUid].name,
    description: `Can you just tell the truth next time? Because the group agreed about you ${
      rankers[mostLiedUid].numberLied
    } times, but never seemed to get it right.`
  });

  superlatives.push({
    title: 'The Open Book',
    receivedBy: data.players[mostPerfectUid].name,
    description: `The group guessed you 100% correct ${
      rankers[mostPerfectUid].numberPerfect
    } times, time to add some mystery to your life.`
  });
};

const theDisagreeTeam = (superlatives, data) => {
  const teamPlayers = Object.keys(data.players).reduce(
    (teamPlayers, playerUid) => {
      const player = data.players[playerUid];

      if (!player.teamUid) {
        return teamPlayers;
      }

      if (!teamPlayers[player.teamUid]) {
        teamPlayers[player.teamUid] = {
          players: [],
          topics: {}
        };
      }

      const topics = Object.keys(data.guesses[playerUid]).reduce(
        (topics, topicUid) => {
          if (data.guesses[playerUid][topicUid] === 'active') {
            return topics;
          }

          return {
            ...topics,
            [topicUid]: new Set([
              ...(topics[topicUid] || []),
              data.guesses[playerUid][topicUid]
            ])
          };
        },
        teamPlayers[player.teamUid].topics
      );

      teamPlayers[player.teamUid].players.push(player);
      teamPlayers[player.teamUid].topics = topics;

      return teamPlayers;
    },
    {}
  );

  const teamDisagrees = Object.keys(teamPlayers).reduce(
    (teamDisagrees, teamUid) => {
      const team = teamPlayers[teamUid];

      const disagrees = Object.keys(team.topics).reduce(
        (disagrees, topicUid) => disagrees + team.topics[topicUid].size - 1,
        0
      );

      return {
        ...teamDisagrees,
        [teamUid]: disagrees
      };
    },
    {}
  );

  const mostDisagreeUid = Object.keys(teamDisagrees).reduce(
    (mostUid, teamUid) =>
      teamDisagrees[mostUid] > teamDisagrees[teamUid] ? mostUid : teamUid
  );

  superlatives.push({
    title: 'The Lone Rangers',
    receivedBy: data.teams[mostDisagreeUid].name,
    description: `Your team disagreed ${
      teamDisagrees[mostDisagreeUid]
    } times! Maybe you should seek counseling...`
  });
};
