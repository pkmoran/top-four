import firebase from 'firebase';

export const addTeamService = (name, gameUid) => {
  firebase.database().ref(`/games/${gameUid}/teams`)
    .push({ name });
};

export const joinTeamService = (teamUid, playerUid, gameUid, joined) => {
  firebase.database().ref(`/games/${gameUid}/teamPlayers`)
    .push({ teamUid, playerUid })
    .then(joined);
};
