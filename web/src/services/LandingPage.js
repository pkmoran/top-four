import firebase from 'firebase';

export const startGameService = (onSuccess, onFail) => {
  firebase.functions().httpsCallable('startGame')()
    .then(({ data }) => {
      pruneGamesService();
      onSuccess(data);
    })
    .catch(onFail);
};

export const addPlayerService = (gameUid, name, onSuccess) => {
  firebase.database().ref(`/games/${gameUid}/players`)
    .push({ name, score: 0 })
    .then(ref => onSuccess(ref.key));
};

const pruneGamesService = () => {
  firebase.functions().httpsCallable('pruneGames')();
}
