import firebase from 'firebase';

export const startGameService = (onSuccess, onFail) => {
  firebase.functions().httpsCallable('startGame')()
    .then(({ data }) => {
      onSuccess(data);
    })
    .catch(onFail);
};

export const addPlayer = (gameUid, name, onSuccess, onFail) => {
  firebase.database().ref(`/games/${gameUid}/players`)
    .push({ name })
    .then(onSuccess)
    .catch(onFail);
};
