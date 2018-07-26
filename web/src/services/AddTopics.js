import firebase from 'firebase';

export const addTopicService = (topic, gameUid) => {
  firebase.database().ref(`/games/${gameUid}/topics`)
    .push({ topic });
};
