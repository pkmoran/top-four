import firebase from 'firebase';

export const getGamesService = (onGames) => {
  firebase
    .database()
    .ref('/games')
    .on('value', (snapshot) => {
      onGames(snapshot.val());
    });
};

export const getTeamsService = (gameUid, onTeams) => {
  firebase
    .database()
    .ref(`/games/${gameUid}/teams`)
    .on('value', (snapshot) => {
      onTeams(snapshot.val());
    });
};

export const getPlayersService = (gameUid, onPlayers) => {
  firebase
    .database()
    .ref(`/games/${gameUid}/players`)
    .on('value', (snapshot) => {
      onPlayers(snapshot.val());
    });
};

export const getTopicsService = (gameUid, onTopics) => {
  firebase
    .database()
    .ref(`/games/${gameUid}/topics`)
    .on('value', (snapshot) => {
      onTopics(snapshot.val());
    });
};

export const updateTopicsService = (topics, gameUid, onUpdated) => {
  firebase
    .database()
    .ref(`/games/${gameUid}/topics`)
    .update(topics, () => {
      onUpdated();
    });
};
