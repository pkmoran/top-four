import firebase from 'firebase';

export const getGamesService = (onGames) => {
  firebase.database().ref('/games').on('value', (snapshot) => {
    onGames(snapshot.val());
  });
};
