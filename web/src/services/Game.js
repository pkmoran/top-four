import firebase from 'firebase';
import _ from 'lodash';

export const getGameUidService = async gameId => {
  const games = await firebase
    .database()
    .ref('/games')
    .once('value');

  return _.findKey(games.val(), { gameId });
};

export const getGameService = (gameUid, onGame) => {
  firebase
    .database()
    .ref(`/games/${gameUid}`)
    .on('value', snapshot => {
      onGame(snapshot.val());
    });
}

export const joinTeamService = (teamUid, playerUid, gameUid) => {
  firebase
    .database()
    .ref(`/games/${gameUid}/players/${playerUid}`)
    .update({ teamUid });
};

export const updateTopicsService = (topics, gameUid, onUpdated) => {
  firebase
    .database()
    .ref(`/games/${gameUid}/topics`)
    .update(topics, () => {
      onUpdated();
    });
};

export const startRoundService = (gameUid, rankingPlayerUid) => {
  firebase
    .database()
    .ref(`/games/${gameUid}`)
    .update({ rankingPlayerUid, state: 'ranking' });
};

export const setRoundRankedService = (gameUid) => {
  firebase
    .database()
    .ref(`/games/${gameUid}`)
    .update({ state: 'ranked' });
};

export const endRoundService = gameUid => {
  firebase
    .database()
    .ref(`/games/${gameUid}`)
    .update({ rankingPlayerUid: '', state: '' });
};

export const updatePlayerScoreService = (gameUid, playerUid, score) => {
  firebase
    .database()
    .ref(`/games/${gameUid}/players/${playerUid}`)
    .update({ score });
};

export const setPlayerLockedInService = (gameUid, playerUid, lockedIn, onUpdated) => {
  firebase
    .database()
    .ref(`/games/${gameUid}/players/${playerUid}`)
    .update({ lockedIn }, onUpdated);
}
