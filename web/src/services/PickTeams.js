import firebase from 'firebase';

export const addTeamService = (name, gameUid) => {
  firebase.database().ref(`/games/${gameUid}/teams`)
    .push({ name });
};

export const joinTeamService = (teamUid, playerUid, gameUid) => {
  firebase.database().ref(`/games/${gameUid}/players/${playerUid}`)
    .update({ teamUid });
};