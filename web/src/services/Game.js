import firebase from 'firebase';
import findKey from 'lodash/findKey';
import forEach from 'lodash/forEach';

export const getGameUidService = async gameId => {
  const games = await firebase
    .database()
    .ref('/games')
    .once('value');

  return findKey(games.val(), { gameId });
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

export const setPlayerLockedInService = async (
  gameUid,
  playerUid,
  localRanks,
  onUpdated
) => {
  await firebase
    .database()
    .ref(`/games/${gameUid}/players/${playerUid}`)
    .update({ lockedIn: true });

  const guesses = {};

  forEach(localRanks, (rank, topicUid) => {
    guesses[topicUid] = rank;
  });

  firebase
    .database()
    .ref(`/games/${gameUid}/guesses/${playerUid}`)
    .update(guesses, onUpdated);
};

export const updateGameService = (game, gameUid, then) => {
  firebase
    .database()
    .ref(`/games/${gameUid}`)
    .update(game, then);
};

export const updatePlayerService = (player, playerUid, gameUid, then) => {
  firebase
    .database()
    .ref(`/games/${gameUid}/players/${playerUid}`)
    .update(player, then);
};

export const watchGameStateService = (gameUid, onStateChange) => {
  firebase
    .database()
    .ref(`/games/${gameUid}/state`)
    .on('value', state => {
      onStateChange(state.val());
    });
};

export const stopWatchingGameStateService = gameUid => {
  firebase
    .database()
    .ref(`/games/${gameUid}/state`)
    .off('value');
};
