import { withPageView } from '@services/logger';
import withRequireGame from 'components/shared/require_game';

import Teams from 'components/teams';

export default withPageView(withRequireGame(Teams));
