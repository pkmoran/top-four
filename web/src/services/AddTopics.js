import firebase from 'firebase';

export const addTopicService = (topic, gameUid) => {
  firebase.database().ref(`/games/${gameUid}/topics`)
    .push({ topic });
};

export const getTopicsService = (gameUid, onTopics) => {
  firebase.database().ref(`/games/${gameUid}/topics`).on('value', (snapshot) => {
    onTopics(snapshot.val());
  });
};
