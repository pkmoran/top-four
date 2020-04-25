import { withPageView } from '@services/logger';
import withRequireGame from 'components/shared/require_game';

import AddTopics from 'components/add_topics';

export default withPageView(withRequireGame(AddTopics));
