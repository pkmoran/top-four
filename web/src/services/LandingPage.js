import firebase from 'firebase';

export const startGameService = (onSuccess, onFail) => {
  firebase.functions().httpsCallable('startGame')()
    .then(({ data }) => {
      onSuccess(data);
    })
    .catch(onFail);
};

export const addPlayerService = (gameUid, name, onSuccess) => {
  firebase.database().ref(`/games/${gameUid}/players`)
    .push({ name })
    .then(ref => onSuccess(ref.key));
};
