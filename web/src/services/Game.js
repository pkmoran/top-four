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
};

export const getPacksService = async () => {
  const topicPacks = await firebase
    .database()
    .ref('/topicPacks')
    .once('value');

  return topicPacks.val();
};

export const joinTeamService = (teamUid, playerUid, gameUid) => {
  firebase
    .database()
    .ref(`/games/${gameUid}/players/${playerUid}`)
    .update({ teamUid });
};

export const setPlayerLockedInService = (gameUid, playerUid, lockedIn, onUpdated) => {
  firebase
    .database()
    .ref(`/games/${gameUid}/players/${playerUid}`)
    .update({ lockedIn }, onUpdated);
}

export const updateGameService = (game, gameUid, then) => {
  firebase
    .database()
    .ref(`/games/${gameUid}`)
    .update(game, then);
};
