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

export { startGameService, getTopicPacksService, addPlayerService };
