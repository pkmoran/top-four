import firebase from 'firebase';

export const startGameService = (numberOfTeams, onSuccess, onFail) => {
  firebase.functions().httpsCallable('startGame')({ numberOfTeams })
    .then(({ data }) => {
      pruneGamesService();
      onSuccess(data);
    })
    .catch(onFail);
};

export const addPlayerService = (gameUid, name, onSuccess) => {
  firebase.database().ref(`/games/${gameUid}/players`)
    .push({ name, score: 0, lockedIn: false })
    .then(ref => onSuccess(ref.key));
};

const pruneGamesService = () => {
  firebase.functions().httpsCallable('pruneGames')();
};
