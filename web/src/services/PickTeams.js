import firebase from 'firebase';

export const addTeamService = (name, gameUid, onAdded) => {
  firebase.database().ref(`/games/${gameUid}/teams`)
    .push({ name })
    .then(() => {
      onAdded();
    });
};

export const getTeamsService = (gameUid, onTeams) => {
  firebase.database().ref(`/games/${gameUid}/teams`)
    .on('value', (snapshot) => {
      onTeams(snapshot.val());
    });
};
