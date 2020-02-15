import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/functions';

const startGameService = async ({ name }) => {
  const startGame = firebase.functions().httpsCallable('startGame');

  const { data } = await startGame({ numberOfTeams: 2 });
  return data;
};

export { startGameService };
