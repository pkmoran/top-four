import firebase from 'firebase/app';
import 'firebase/database';

export const addTopicService = (topic, playerUid, gameUid) => {
  firebase
    .database()
    .ref(`/games/${gameUid}/topics`)
    .push({
      topic,
      playerUid,
      status: 'available',
      rank: -1
    });
};

export const deleteTopicService = (topicUid, gameUid) => {
  firebase
    .database()
    .ref(`/games/${gameUid}/topics/${topicUid}`)
    .remove();
};
