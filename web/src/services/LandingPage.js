import firebase from 'firebase';

export const startGameService = (
  numberOfTeams,
  topicPackUid,
  onSuccess,
  onFail
) => {
  firebase
    .functions()
    .httpsCallable('startGame')({ numberOfTeams, topicPackUid })
    .then(({ data }) => {
      pruneGamesService();
      onSuccess(data);
    })
    .catch(onFail);
};

export const addPlayerService = (gameUid, name, onSuccess) => {
  firebase
    .database()
    .ref(`/games/${gameUid}/players`)
    .push({ name, score: 0, lockedIn: false })
    .then(ref => onSuccess(ref.key));
};

const pruneGamesService = () => {
  firebase.functions().httpsCallable('pruneGames')();
};

export const superlativesService = (onSuccess, onFail) => {
  firebase
    .functions()
    .httpsCallable('superlatives')()
    .then(({ data }) => {
      onSuccess(data);
    })
    .catch(onFail);
};
