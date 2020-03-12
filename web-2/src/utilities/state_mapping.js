const teamsToArray = teams =>
  Object.keys(teams).map(uid => ({ uid, ...teams[uid] }));

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

export { teamsToArray, playersToPlayersByTeam, toPlayer };
