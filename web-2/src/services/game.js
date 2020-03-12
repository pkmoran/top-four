import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/functions';

const startGameService = async ({ numberOfTeams, topicPackUid }) => {
  const startGame = firebase.functions().httpsCallable('startGame');

  const response = await startGame({ numberOfTeams, topicPackUid });

  // prune games for now
  pruneGamesService();

  return response.data;
};

const addPlayerService = async ({ gameUid, name }) => {
  const response = await firebase
    .database()
    .ref(`/games/${gameUid}/players`)
    .push({ name, score: 0, lockedIn: false });

  return response.key;
};

const getTopicPacksService = async () => {
  const topicPacks = await firebase
    .database()
    .ref('/topicPacks')
    .once('value');

  return topicPacks.val();
};

const pruneGamesService = () => {
  const pruneGames = firebase.functions().httpsCallable('pruneGames');
  pruneGames();
};

const getGameUidService = async gameId => {
  const response = await firebase
    .database()
    .ref('/games')
    .once('value');

  const games = response.val();

  return Object.keys(games)
    .map(gameUid => ({
      gameUid,
      ...games[gameUid]
    }))
    .find(game => game.gameId === gameId);
};

const subscribeToGameUpdatesService = (gameUid, on) => {
  firebase
    .database()
    .ref(`/games/${gameUid}`)
    .on('value', snapshot => on(snapshot.val()));
};

const joinTeamService = ({ teamUid, playerUid, gameUid }) => {
  firebase
    .database()
    .ref(`/games/${gameUid}/players/${playerUid}`)
    .update({ teamUid });
};

export {
  startGameService,
  getTopicPacksService,
  addPlayerService,
  getGameUidService,
  subscribeToGameUpdatesService,
  joinTeamService
};
