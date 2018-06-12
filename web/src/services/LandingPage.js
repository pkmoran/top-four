import firebase from 'firebase';

export const startGameService = (onSuccess, onFail) => {
  firebase.functions().httpsCallable('startGame')().then(({ data }) => {
    onSuccess(data.gameId);
  }).catch(() => {
    onFail();
  });
};
