const teamsToArray = teams =>
  Object.keys(teams).map(uid => ({ uid, ...teams[uid] }));

const topicsToArray = topics =>
  Object.keys(topics).map(uid => ({ uid, ...topics[uid] }));

const topicsToCount = topics => Object.keys(topics).length;

const topicsToPlayerTopics = ({ playerUid, game: { topics = {} } }) =>
  topicsToArray(topics).filter(topic => topic.playerUid === playerUid);

const playersToPlayersByTeam = players =>
  Object.keys(players)
    .map(uid => ({ uid, ...players[uid] }))
    .reduce((playersByTeam, player) => {
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

export {
  teamsToArray,
  topicsToArray,
  topicsToCount,
  topicsToPlayerTopics,
  playersToPlayersByTeam,
  toPlayer
};
