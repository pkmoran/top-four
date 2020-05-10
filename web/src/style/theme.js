import { createMuiTheme } from '@material-ui/core/styles';

import variables from 'style/_variables';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: variables.colorPrimary,
    },
    secondary: {
      main: variables.colorSecondary,
    },
  },
});

export default theme;
