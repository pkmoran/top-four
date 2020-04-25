import { withPageView } from '@services/logger';
import withRequireGame from 'components/shared/require_game';

import Share from 'components/share';

export default withPageView(withRequireGame(Share));
