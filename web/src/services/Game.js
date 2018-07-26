import firebase from 'firebase';

export const getGamesService = (onGames) => {
  firebase.database().ref('/games').on('value', (snapshot) => {
    onGames(snapshot.val());
  });
};

export const getTeamsService = (gameUid, onTeams) => {
  firebase.database().ref(`/games/${gameUid}/teams`)
    .on('value', (snapshot) => {
      onTeams(snapshot.val());
    });
};

export const getTeamPlayersService = (gameUid, onTeamPlayers) => {
  firebase.database().ref(`/games/${gameUid}/teamPlayers`)
    .on('value', (snapshot) => {
      onTeamPlayers(snapshot.val());
    });
};

export const getTopicsService = (gameUid, onTopics) => {
  firebase.database().ref(`/games/${gameUid}/topics`)
    .on('value', (snapshot) => {
      onTopics(snapshot.val());
    });
};
