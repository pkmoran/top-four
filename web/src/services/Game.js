import firebase from 'firebase';
import findKey from 'lodash/findKey';

export const getGameFromIdService = async gameId => {
  const games = await firebase
    .database()
    .ref('/games')
    .once('value');

  const gameUid = findKey(games.val(), { gameId });

  if (!gameUid) {
    throw new Error('gameUid does not exist');
  }

  return games[gameUid];
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

export const updatePlayerService = (player, playerUid, gameUid, then) => {
  firebase
    .database()
    .ref(`/games/${gameUid}/players/${playerUid}`)
    .update(player, then);
}

export const watchGameStateService = (gameUid, onStateChange) => {
  firebase
    .database()
    .ref(`/games/${gameUid}/state`)
    .on('value', state => {
      onStateChange(state.val());
    });
}

export const stopWatchingGameStateService = (gameUid) => {
  firebase
    .database()
    .ref(`/games/${gameUid}/state`)
    .off('value');
}
