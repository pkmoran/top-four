import { startGameService } from 'services/game';

const startGame = async ({ name }, { dispatch }) => {
  const response = await startGameService({ name }).catch(err => {
    console.log('azs failure', err);
  });

  if (response) {
    console.log('azs success', response.gameId);
  }
};

export { startGame };
