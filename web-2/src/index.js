import { ThemeProvider } from '@material-ui/core';

import { GameStateProvider } from '@state';
import { saveState, loadState } from 'utilities/local_storage';

import App from 'components/app';

import 'style';
import 'typeface-roboto';

import theme from 'style/theme';

const Root = () => {
  const state = loadState();
  saveState({});

  return (
    <ThemeProvider theme={theme}>
      <GameStateProvider initialState={state}>
        <App />
      </GameStateProvider>
    </ThemeProvider>
  );
};

export default Root;
