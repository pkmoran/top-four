import firebase from 'firebase';

export const addTopicService = (topic, playerUid, gameUid) => {
  firebase.database().ref(`/games/${gameUid}/topics`)
    .push({ topic, playerUid });
};

export const deleteTopicService = (topicUid, gameUid) => {
  firebase.database().ref(`/games/${gameUid}/topics/${topicUid}`).remove();
};
