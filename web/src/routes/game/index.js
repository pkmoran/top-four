import { withPageView } from '@services/logger';
import withRequireGame from 'components/shared/require_game';

import Game from 'components/game';

export default withPageView(withRequireGame(Game));
