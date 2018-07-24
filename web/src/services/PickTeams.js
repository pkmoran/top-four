import firebase from 'firebase';

export const addTeamService = (name, gameUid) => {
  firebase.database().ref(`/games/${gameUid}/teams`)
    .push({ name });
};

export const getTeamsService = (gameUid, onTeams) => {
  firebase.database().ref(`/games/${gameUid}/teams`)
    .on('value', (snapshot) => {
      onTeams(snapshot.val());
    });
};

export const getTeamPlayersService = (gameUid, onTeamPlayers) => {
  firebase.database().ref(`/games/${gameUid}/teamPlayers`)
    .on('value', (snapshot) => {
      onTeamPlayers(snapshot.val());
    });
};

export const joinTeamService = (teamUid, playerUid, gameUid) => {
  firebase.database().ref(`/games/${gameUid}/teamPlayers`)
    .push({ teamUid, playerUid });
};
